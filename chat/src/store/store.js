import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

const state = {
  el: 1
}

// const mutations = {
//   set(state, val) {
//     state.el = val
//   }
// }

export default new Vuex.Store({
  state
})
