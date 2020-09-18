import Vue from 'vue'
import router from '@/router'

const remote = require('electron').remote

const state = {
  authenticated: false,
  token: null,
  user:null,
}

const mutations = {
  SET_AUTH (state,data) {
    state.authenticated = data
  },
  SET_TOKEN (state,data) {
    state.token = data
  },
  SET_USER (state,data) {
    state.user = data
  },
}

const actions = {
  setAuth (context, data) {
    context.commit('SET_AUTH',data)
  },
  setToken (context, data) {
    Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data
    context.commit('SET_TOKEN',data)
  },
  setUser (context, data) {
    context.commit('SET_USER',data)
  },
  logout (context){
    context.dispatch('setAuth',false);
    context.dispatch('setToken',null);
    //context.dispatch('setUser',null);
    //router.push('/')
  },
  setTitle(context,title){
    title = title ? `${title} |` : ''
    remote.getCurrentWindow().setTitle(`${title} SCT SLP v${remote.app.getVersion()}`);
  }
}

export default {
  state,
  mutations,
  actions
}
