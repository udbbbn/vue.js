import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload'
import resuming from '@/components/resuming'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: upload
    },
    {
      path: '/resuming',
      name: 'resuming',
      component: resuming
    }
  ]
})
