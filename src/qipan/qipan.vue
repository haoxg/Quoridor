<template>
	<div id="game">
		<section class="pan">
			<ul>
				<li class="pos" :class="gezi.type" :style="{
						left: (gezi.x * 30+gezi.x * 15)/2 +'px',
						top: (gezi.y * 30+gezi.y * 15)/2 +'px',
					}" v-for="(gezi,index) in gezis" :data-x="gezi.x" :data-y="gezi.y" :key="index" @click="fangqiang($event)"></li>
			</ul>
			<ren :name="p" v-for="p in players" v-on:move="moveRen($event)" ref="ren" :key="p"></ren>
		</section>
		
	</div>
</template>

<script>
	import $ from "jquery"
	import Ren from "./ren"

	export default {
		name: 'Game',
		components: {
			Ren
		},
		data: function() {
			return{
				players: ['p1', 'p2'],
			}
			
		},
		computed:{
			gezis: function(){
				let geziss = [];
				for (var i=0; i< 17; i++) {
					for (var j =0; j<17; j++) {
						geziss.push({
							type: i%2 >0 || j%2>0 || (i+j)%2 >0 ? 'gou' : 'block',
							x: i,
							y: j
						})
					}
				}
				return geziss;
			}
		},
		created: function() {
			//
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
				console.log(event);
			},
		}
	}
</script>

<style>
	.pan{
		width: 390px;
		height: 390px;
		overflow: hidden;
		display: block;
		position: relative;
	}
	.gou {
		background-color: #333333;
		width: 20px;
		height: 20px;
	}

	.block {
		background-color: yellow;
		box-shadow: 4px 5px 4px 2px black;
		z-index: 1;
	}

	.pos {
		position: absolute;
		width: 30px;
		height: 30px;
		list-style: none;
	}

	.wall1{
		background: red;
		width: 300%;
		height: 40%;
		z-index: 2;
		position: absolute;
		margin-top: 30%;
	}
	.wall2{
		background: red;
		height: 300%;
		width: 40%;
		z-index: 2;
		position: absolute;
		margin-left: 30%;
	}
</style>