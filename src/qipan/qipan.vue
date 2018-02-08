<template>
	<div id="game">
		<section class="pan">
			<ul>
				<li class="pos" :class="gezi.type" :data-type="gezi.type" :cross-wall="gezi.x%2 ===1 && gezi.y%2 ===1" :wall-type="gezi.x%2 === 1? 'horizontal':'vertical'" :style="{
						top: (gezi.x * 30+gezi.x * 15)/2 +'px',
						left: (gezi.y * 30+gezi.y * 15)/2 +'px',
					}" v-for="(gezi,index) in gezis" :data-index="gezi.index" :data-x="gezi.x" :data-y="gezi.y" :key="index" @click="fangqiang($event)">
						<wall :isHorizontalWall="gezi.x%2 === 1? true:false" v-if="gezi.hasWall" ref="wall"></wall>
					</li>
			</ul>
			<ren :name="p.id" v-for="(p,index) in players" v-on:move="moveRen($event)" ref="ren" :key="p.id" :style="'left:'+(p.pos[0] * 30+p.pos[0] * 15)/2 +'px;top:'+(p.pos[1] * 30+p.pos[1] * 15)/2 +'px;'"></ren>
		</section>
		<div class="game-info">
			<span class="walls">
				<i v-for="n in 10" :class="{active:players[1].walls>=n}"></i>
			</span>
			<span v-bind:class="{active:turn==1}">{{players[1].name}}</span>
			<span class="steps">{{round}}</span>
			<span v-bind:class="{active:turn==0}">{{players[0].name}}</span>
			<span class="walls">
				<i v-for="n in 10" :class="{active:players[0].walls>=n}"></i>
			</span>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import Ren from "./ren"
	import Wall from "./wall"
	var ws = new WebSocket("ws://123.57.231.78:8181");
	export default {
		name: 'Game',
		components: {
			Ren,Wall
		},
		data: function() {
			return{
				players: [],
				gezis: [],
				round:0,
				turn:0,
			}
		},
		created: function() {
			ws.onopen = function (e) {
				console.log('Connection to server opened');
			}
			//
			this.players = this.$store.state.rens;
			let geziss = [];
			for (var i=0; i< 17; i++) {
				for (var j =0; j<17; j++) {
					geziss.push({
						index: (i*17)+(j+1),
						type: i%2 >0 || j%2>0 || (i+j)%2 >0 ? 'gou' : 'block',
						x: i,
						y: j,
						hasWall: false,
					})
				}
			};
			this.gezis = geziss;
		},
		mounted: function() {
			this.fangren(0);
			this.fangren(1);
			//
			ws.onmessage = (e) =>{
				let data = JSON.parse(JSON.parse(e.data).message);
				//同步人
				// this.players = this.$store.state.rens;
				// console.log(data.currentTurn);
				// this.fangren(data.currentTurn);
				this.$set(this.players[data.currentTurn],"pos",data.player.pos)
				//同步步数
				this.round = data.round;
				//同步轮次
				this.turn = data.turn;
				//同步方格、墙
				this.gezis = data.gezis;
				//同步墙数量
				this.$set(this.players[data.currentTurn],"walls",data.player.walls)
			}
		},
		methods:{
			rens: function(index) {
				return this.$refs.ren[index];
			},
			fangren:function(who){
				let x = this.players[who].pos[0]
				let y = this.players[who].pos[1]
				let id = this.players[who].id
				
				// $("#" + id).css("left",(x * 30+x * 15)/2 +'px')
				// $("#" + id).css("top",(y * 30+y * 15)/2 +'px')
				$("#" + id).css("animation",'jump .4s')
				setTimeout(()=>{$("#" + id).css("animation",'')},400)
				$("li.block").css("z-index","1");
				$("#" + id).parent().css("z-index","2");
				
				this.rens(who).setPos(x,y);
			},
			moveRen:function(ren){
				
				this.$store.commit('changePos',[ren.x,ren.y]);
				//this.fangren(this.turn);
				// 切换回合
				this.switchTurn();
			},
			fangqiang:function(event){	
				if(event.target.getAttribute("data-type") === "gou"){
					//是否还有墙
					if(this.players[this.$store.state.turn].walls == 0 ){
						alert("您没障碍物了");
						return;
					};
					if(event.target.getAttribute("data-x")%2 === 0){
						let index = event.target.getAttribute("data-index");
						this.$set(this.gezis[index-1],"hasWall", !this.gezis[index-1].hasWall);
					}else{
						if(event.target.getAttribute("data-y")%2 === 0){
							let index = event.target.getAttribute("data-index");
							this.$set(this.gezis[index-1],"hasWall", !this.gezis[index-1].hasWall);
						}
					}
					//因为墙的x,y坐标与人的x，y坐标相反，所以赋值时取反
					let [x,y] = [Number(event.target.getAttribute("data-y")),Number(event.target.getAttribute("data-x"))];
					
					//使用自己的墙-1,并记录墙的位置
					this.$store.commit('useWall',[x,y]);
					//切换回合
					this.switchTurn();
				}
			},
			switchTurn(){
				let currentTurn = this.turn; //记录当前轮次
				this.$store.commit('switchTurn');
				this.round = this.$store.state.round;
				this.turn = this.$store.state.turn;
				this.players = this.$store.state.rens;
				this.sendMessage(currentTurn,this.players[currentTurn],this.round,this.turn,this.gezis);
			},
			//发送信息
			sendMessage(currentTurn,player,round,turn,gezis) {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify({
						"currentTurn":currentTurn,
						"player":player,
						"round":round,
						"turn":turn,
						"gezis":gezis
					}));
				}
			}
		}
	}
</script>

<style>
	#game {
		display: flex;
    	justify-content: center;
	}
	.pan{
		width: 390px;
		height: 390px;
		/* overflow: hidden; */
		display: block;
		position: relative;
		box-shadow: 8px 8px 10px 0px rgb(0, 0, 0);
		float: left;
	}
	.gou {
		background-color: #333333;
		width: 20px;
		height: 20px;
	}

	.block {
		background-color: #6d0f0f;
		box-shadow: 4px 5px 4px 2px black;
		z-index: 1;
	}

	.pos {
		position: absolute;
		width: 30px;
		height: 30px;
		list-style: none;
	}
	.gou[wall-type='horizontal']:not([cross-wall]):hover::before {
		display: inline-block;
	}
	.gou[wall-type='horizontal']::before {
		content: '';
		display: none;
		pointer-events: none;
		background: #da0000;
		width: 248%;
		height: 19%;
		z-index: 2;
		position: absolute;
		margin-top: 14%;
		left: 0;
		border-bottom: 13px solid #510f0f;
		border-right: 2px solid #510f0f;
		box-shadow: 7px 9px 13px 0px rgba(0, 0, 0, 0.43);
		opacity: .6;
	}
	.gou[wall-type='vertical']:hover::before {
		display: inline-block;
	}
	.gou[wall-type='vertical']::before {
		content: '';
		display: none;
		pointer-events: none;
        background: #da0000;
        height: 248%;
        width: 26%;
        z-index: 2;
        position: absolute;
        margin-left: 35%;
        margin-top: -8px;
		left: 0;
        border-bottom: 15px solid #510f0f;
        border-right: 2px solid #510f0f;
        box-shadow: 0px 16px 13px 0px rgba(0, 0, 0, 0.91);
		opacity: .6;
	}
	.game-info{
		float: left;
		height: 400px;
		/* background: #eee; */
		width: 200px;
		display: flex;
		align-items: center;
		flex-direction: column;
    	justify-content: center;
	}
	.game-info span{
		font-size: 20px;
		line-height: 80px;
		color: #cccccc;
	}
	.game-info span.steps{
		font-size: 30px;
		color: rgb(0, 114, 38)
	}
	.game-info span.active{
		color: red;
	}
	.game-info span.walls>i{
		height: 25px;
		width: 5px;
		background: #ddd;
		display: inline-block;
		margin: 2px;
	}
	.game-info span.walls>i.active{
		background: red;
	}
</style>