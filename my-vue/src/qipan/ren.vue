<template>
	<div :id="name" class="ren" v-on:click="onMove"></div>
</template>

<script>
	export default{
		name: 'ren', 
		data:function(){
			return{
				x:8,
				y:16
			}
		},
		props:['name'],
		methods:{
			onMove:function(){
				this.$emit("move",this);
			},
			move:function(){
				return {
					x: this.x,
					y: this.y - 2
				}
			},
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
		border-radius: 50%;
		background-color:red;
	}
</style>