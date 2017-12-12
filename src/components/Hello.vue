<template>
  <div class="hello">
    <ul>
      <li><a v-on:click="tiaoz">步步围营</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'This is My First Vue.js App'
    }
  },
  methods:{
    tiaoz:function(){
      this.$router.push({name:'Game'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
