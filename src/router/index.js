import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BookSelectGame from '@/components/book/select-game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/book/Select-game/select-game',
      name: 'BookSelectGame',
      component: BookSelectGame
    }
  ]
})
