<template>
    <div :class="isHorizontalWall ? 'wall1' : 'wall2'"></div>
</template>

<script>
export default {
    data(){
        return {
            // isHorizontalWall:true,
        }
    },
    props: {
        isHorizontalWall:{
            required:true,
            default:true,
        },
    },
}
</script>

<style scoped>
    .wall1{
        pointer-events:none;
		background: #da0000;
		width: 248%;
		height: 19%;
		z-index: 2;
		position: absolute;
		margin-top: 14%;
		border-bottom: 13px solid #510f0f;
		border-right: 2px solid #000000;
		box-shadow: 7px 9px 13px 0px rgba(0, 0, 0, 0.43);
	}
	.wall2{
        pointer-events: none;
        background: #da0000;
        height: 248%;
        width: 26%;
        z-index: 2;
        position: absolute;
        margin-left: 35%;
        margin-top: -8px;
        border-bottom: 15px solid #510f0f;
        border-right: 2px solid #510f0f;
        box-shadow: 0px 16px 13px 0px rgba(0, 0, 0, 0.91);
	}
</style>
