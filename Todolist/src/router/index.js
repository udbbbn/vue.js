import Vue from 'vue'
import Router from 'vue-router'
import mailbox from '@/view/mailbox'
import query from '@/view/query'
import app from '@/App'
import index from '@/view/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/query',
      name: 'search',
      component: query
    },
    {
      path: '/mailbox',
      name: 'mailbox',
      component: mailbox
    }
  ]
})
