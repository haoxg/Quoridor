<template>
	<div :id="name" class="ren" v-on:click="showArrow">
		<div v-show="isShowArrow" v-on:click="MoveUp" class="up">↑</div>
		<div v-show="isShowArrow" v-on:click="MoveLeft" class="left">←</div>
		<div v-show="isShowArrow" v-on:click="MoveRight" class="right">→</div>
		<div v-show="isShowArrow" v-on:click="MoveDown" class="down">↓</div>
	</div>
</template>

<script>
	export default{
		name: 'ren', 
		data:function(){
			return{
				isShowArrow:false,
				x:8,
				y:16,
			}
		},
		props:['name'],
		methods:{
			showArrow:function(){
				this.isShowArrow = !this.isShowArrow;
			},
			MoveUp:function(){
				this.y = this.y - 2;
				this.$emit("move",this);
			},
			MoveLeft:function(){
				this.x = this.x - 2;
				this.$emit("move",this);
			},
			MoveRight:function(){
				this.x = this.x + 2;
				this.$emit("move",this);
			},
			MoveDown:function(){
				this.y = this.y + 2;
				this.$emit("move",this);
			},
			// move:function(to){
			// 	if(to == 'up'){
			// 		return {
			// 			x: this.x,
			// 			y: this.y - 2
			// 		}
			// 	}
			// },
			setPos: function(x,y) {
				this.x = x;
				this.y = y;
			}
		}
	}
</script>
<style>
	.ren {
		width:100%;
		height:100%;
		width: 30px;
		height: 30px;
		position: absolute;
		cursor: pointer;
	}
	.ren::after {
		content: '';
		display: inline-block;
		width:100%;
		height:100%;
		background-image: url('../assets/aaa.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center center;
		position: absolute;
		left: 0;
		top: -3px;
		z-index: 2;
	}
	.ren > div{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.46);
	}
	.ren .up{top: -100%;}
	.ren .left{left: -100%;}
	.ren .right{left: 100%;}
	.ren .down{top: 100%;}
</style>