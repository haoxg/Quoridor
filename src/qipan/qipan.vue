<template>
	<div id="game">
		<section class="pan">
			<ul>
				<li class="pos" :class="gezi.type" :style="{
						left: gezi.x * 30 +'px',
						top: gezi.y * 30 +'px',
					}" v-for="(gezi,index) in gezis" :data-x="gezi.x" :data-y="gezi.y" :key="index">        </li>
			</ul>
		</section>
		<ren :name="p" v-for="p in players" v-on:move="moveRen($event)" ref="ren" :key="p"></ren>
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
				$('.pos[data-x='+x+'][data-y='+y+']').append($("#" + ren.name));
				ren.setPos(x,y);      
			},
			moveRen:function(ren){
				this.rens(1);
				// var dest = ren.move();
				this.fangren(ren.x,ren.y,ren);
			}
		}
	}
</script>

<style>
	.gou {
		background-color: black;
	}

	.block {
		background-color: yellow;
	}

	.pos {
		position: absolute;
		width: 30px;
		height: 30px;
		list-style: none;
	}
</style>