<template>
	<div id="game">
		<section class="pan">
			<ul>
				<li class="pos" :class="gezi.type" :data-type="gezi.type" :style="{
						left: (gezi.x * 30+gezi.x * 15)/2 +'px',
						top: (gezi.y * 30+gezi.y * 15)/2 +'px',
					}" v-for="(gezi,index) in gezis" :data-index="gezi.index" :data-x="gezi.x" :data-y="gezi.y" :key="index" @click="fangqiang($event)">
						<wall :isHorizontalWall="gezi.x%2 === 1? false:true" v-if="gezi.hasWall"></wall>
					</li>
			</ul>
			<ren :name="p" v-for="p in players" v-on:move="moveRen($event)" ref="ren" :key="p"></ren>
			
		</section>
		
	</div>
</template>

<script>
	import $ from "jquery"
	import Ren from "./ren"
	import Wall from "./wall"

	export default {
		name: 'Game',
		components: {
			Ren,Wall
		},
		data: function() {
			return{
				players: ['p1', 'p2'],
				gezis:[],
			}
			
		},
		computed:{
			gezis1: function(){
				
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
				}
				console.log(geziss);
				return geziss;
			}
		},
		created: function() {
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
			this.fangren(8,16,this.rens(0));
			this.fangren(8,0,this.rens(1));
		},
		methods:{
			rens: function(index) {
				return this.$refs.ren[index];
			},
			fangren:function(x,y,ren){
				// $('.pos[data-x='+x+'][data-y='+y+']').append($("#" + ren.name));
				$("#" + ren.name).css("left",(x * 30+x * 15)/2 +'px')
				$("#" + ren.name).css("top",(y * 30+y * 15)/2 +'px')
				$("li.block").css("z-index","1");
				$("#" + ren.name).parent().css("z-index","2");
				ren.setPos(x,y);   
			},
			moveRen:function(ren){
				this.rens(1);
				// var dest = ren.move();
				this.fangren(ren.x,ren.y,ren);
			},
			fangqiang:function(event){
				if(event.target.getAttribute("data-type") === "gou"){
					if(event.target.getAttribute("data-x")%2 === 0){
						let index = event.target.getAttribute("data-index");
						this.$set(this.gezis[index-1],"hasWall", !this.gezis[index-1].hasWall);
						console.log(this.gezis[index-1].hasWall);
					}else{
						if(event.target.getAttribute("data-y")%2 === 0){
							let index = event.target.getAttribute("data-index");
							this.$set(this.gezis[index-1],"hasWall", !this.gezis[index-1].hasWall);
							console.log(this.gezis[index-1].hasWall);
						}
					}
				}
			},
		}
	}
</script>

<style>
	.pan{
		width: 390px;
		height: 390px;
		/* overflow: hidden; */
		display: block;
		position: relative;
		box-shadow: 8px 8px 10px 0px rgb(0, 0, 0);
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
</style>