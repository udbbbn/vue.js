import Vue from 'vue'
import Router from 'vue-router'
import chatBox from '@/components/chatBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chatBox',
      component: chatBox
    }
  ]
})
