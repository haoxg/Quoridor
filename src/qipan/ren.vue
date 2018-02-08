<template>
	<div :id="name" class="ren" v-on:click="showArrow">
		<div v-show="isShowArrow" v-on:click="MoveUp" class="up" :class="{hidden:isHideUp}">↑</div>
		<div v-show="isShowArrow" v-on:click="MoveLeft" class="left" :class="{hidden:isHideLeft}">←</div>
		<div v-show="isShowArrow" v-on:click="MoveRight" class="right" :class="{hidden:isHideRight}">→</div>
		<div v-show="isShowArrow" v-on:click="MoveDown" class="down" :class="{hidden:isHideDown}">↓</div>
	</div>
</template>

<script>
	export default{
		name: 'ren', 
		data:function(){
			return{
				isShowArrow:false,
				x:0,
				y:0,
				walls:10,
				isHideUp:false,
				isHideLeft:false,
				isHideRight:false,
				isHideDown:false,
			}
		},
		props:['name'],
		methods:{
			showArrow:function(){
				if(this.name == "p"+this.$store.state.turn){
					this.isHideLeft = this.isHideUp = this.isHideRight = this.isHideDown = false;
					let pos = this.$store.state.rens[this.$store.state.turn].pos;
					let wallPos = this.$store.state.wallPos;
					//上右下左
					let sxzy = [[pos[0],pos[1]-1],[pos[0]+1,pos[1]],[pos[0],pos[1]+1],[pos[0]-1,pos[1]]];

					let obstruct = [];

					for(let i=0;i < sxzy.length;i++){//4个方向
						for(let j=0;j < wallPos.length;j++){//所有墙的坐标
							if(JSON.stringify(sxzy[i]) == JSON.stringify(wallPos[j])){
								obstruct.push(i)
							}
						}
					}
					//console.log(obstruct);
					for(let i=0;i<obstruct.length;i++){
						if(obstruct[i] == 0){//上
							this.isHideUp = true
						}
						if(obstruct[i] == 1){//右
							this.isHideRight = true
						}
						if(obstruct[i] == 2){//下
							this.isHideDown = true
						}
						if(obstruct[i] == 3){//左
							this.isHideLeft = true;
						}
					}

					if(this.$store.state.rens[this.$store.state.turn].pos[0] <= 0){//x坐标左侧	
						this.isHideLeft = true;
					}
					if(this.$store.state.rens[this.$store.state.turn].pos[0] >= 16){//x坐标右侧
						this.isHideRight = true
					}
					if(this.$store.state.rens[this.$store.state.turn].pos[1] <= 0){//y坐标上边
						this.isHideUp = true
					}
					if(this.$store.state.rens[this.$store.state.turn].pos[1] >= 16){//y坐标下边
						this.isHideDown = true
					}

					this.isShowArrow = !this.isShowArrow;
				};
			},
			MoveUp:function(){
				this.y = this.y - 2;
				this.$emit("move",this);
				this.isShowArrow = !this.isShowArrow;
			},
			MoveLeft:function(){
				this.x = this.x - 2;
				this.$emit("move",this);
				this.isShowArrow = !this.isShowArrow;
			},
			MoveRight:function(){
				this.x = this.x + 2;
				this.$emit("move",this);
				this.isShowArrow = !this.isShowArrow;
			},
			MoveDown:function(){
				this.y = this.y + 2;
				this.$emit("move",this);
				this.isShowArrow = !this.isShowArrow;
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
				//this.$store.state.rens[this.$store.state.turn].pos = [x,y];
			}
		}
	}
</script>
<style>
	@keyframes jump
	{
		0% {transform: scale(1,1);}
		/* 20% {transform: scale(3,3);} */
		100% {transform: scale(1,1);}
	}
	.hidden{
		display:none !important;
	}
	.ren {
		width:100%;
		height:100%;
		width: 30px;
		height: 30px;
		position: absolute;
		cursor: pointer;
		transition: all 0.2s;
		z-index: 2;
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
		top: -5px;
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

	#p0.ren::after {
		background-image: url('../assets/aaa.png');
	}
	#p1.ren::after {
		background-image: url('../assets/bbb.png');
	}
</style>