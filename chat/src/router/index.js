import Vue from 'vue'
import Router from 'vue-router'
import chatBox from '@/components/chatBox'
import pollingChatBox from '@/components/pollingChatBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/polling',
      name: 'pollingChatBox',
      component: pollingChatBox
    },
    {
      path: '/',
      name: 'chatBox',
      component: chatBox
    }
  ]
})
