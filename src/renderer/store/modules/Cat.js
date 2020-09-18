import Vue from 'vue'
import router from '@/router'

const state = {
  municipios: [],
  zonas: [],
  modalidades: [],
  direcciones: [],
}

const mutations = {
  SET_MUNICIPIOS (state,data) {
    state.municipios = data
  },
  SET_ZONAS (state,data) {
    state.zonas = data
  },
  SET_MODALIDADES (state,data) {
    state.modalidades = data
  },
  SET_DIRECCIONES (state,data) {
    state.direcciones = data
  },
}

const actions = {
  setDirecciones (context, data) {
    context.commit('SET_DIRECCIONES',data)
  },
  clearDirecciones (context) {
    context.commit('SET_DIRECCIONES',[])
  },
  actualizarDirecciones(context){
    Vue.axios.get('catalogos/direcciones').then( ({data}) => {
        context.commit('SET_DIRECCIONES',data)
    })
  },
  setMunicipios (context, data) {
    context.commit('SET_MUNICIPIOS',data)
  },
  clearMunicipios (context) {
    context.commit('SET_MUNICIPIOS',[])
  },
  actualizarMunicipios(context){
    Vue.axios.get('catalogos/municipios/estado/24').then( ({data}) => {
        context.commit('SET_MUNICIPIOS',data)
    })
  },
  setModalidades (context, data) {
    context.commit('SET_MODALIDADES',data)
  },
  clearModalidades (context) {
    context.commit('SET_MODALIDADES',[])
  },
  actualizarModalidades(context){
    Vue.axios.get('catalogos/modalidades').then( ({data}) => {
        context.commit('SET_MODALIDADES',data)
    })
  },
  setZonas (context, data) {
    context.commit('SET_ZONAS',data)
  },
  clearZonas (context) {
    context.commit('SET_ZONAS',[])
  },
  actualizarZonas(context){
    Vue.axios.get('catalogos/zonas').then( ({data}) => {
        context.commit('SET_ZONAS',data)
    })
  },
}

export default {
  state,
  mutations,
  actions
}
