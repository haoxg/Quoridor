import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Game from '@/qipan/qipan'

Vue.use(Router)

export default new Router({	
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})
