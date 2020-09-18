import Vue from 'vue'
import router from '@/router'

const remote = require('electron').remote

const state = {
  concurso: null,
  operadores: [],
  inscripciones: [],
  scanned_files:[]
}

const mutations = {
  SET_INSCRIPCIONES (state,data) {
    state.inscripciones = data
  },
  SET_OPERADORES (state,data) {
    state.operadores = data
  },
  SET_CONCURSO (state,data) {
    state.concurso = data
  },
  SET_SCANNED_FILES (state,data) {
    state.scanned_files = data
    console.log('SETTER say: ',state.scanned_files)
  },
  ADD_SCANNED_FILE (state,data) {
    state.scanned_files.push(data)
  },
  DEL_SCANNED_FILE (state,data) {
    console.log('DELETER say: ','deleting '+ data.file)
    const i = _.findIndex(state.scanned_files,['file',data.file]) 
    state.scanned_files.splice(i, 1);
  },
}

const actions = {
  setInscripciones (context, data) {
    context.commit('SET_INSCRIPCIONES',data)
  },
  clearCCScannedFile (context) {
    context.commit('SET_SCANNED_FILES',[])
  },
  addCCScannedFile (context, data) {
    context.commit('ADD_SCANNED_FILE',data)
  },
  delCCScannedFile (context, data) {
    context.commit('DEL_SCANNED_FILE',data)
  },
  setConcurso (context, data) {
    context.commit('SET_CONCURSO',data)
  },
  actualizarConcurso (context) {
    Vue.axios.get('cc/concurso/activo').then( ({data}) => {
        context.commit('SET_CONCURSO',data)
    })
  },
  clearConcurso (context) {
    context.commit('SET_CONCURSO',null)
  },
  setOperadores (context, data) {
    context.commit('SET_OPERADORES',data)
  },
}

export default {
  state,
  mutations,
  actions
}
