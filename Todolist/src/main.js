// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import adapte from '@/assets/js/adapte'
import touch from 'vue-directive-touch'
import $ from 'webpack-zepto'

window.$ = $
Vue.use(touch)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

adapte.setPxPerRem()
