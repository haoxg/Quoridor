<template>
  <div id="app">
    <img src="./assets/logo.png">
    <a @click="tz">跳转</a>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods:{
    tz: function(){
      this.$router.push({name:'Hello'})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
