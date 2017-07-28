import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  adminInfo: {
    avatar: 'default.jpg',
    islogin: false

  }
}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
