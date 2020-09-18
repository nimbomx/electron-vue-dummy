const state = {
  calendarios: [],
  calendario: null,
  agenda: null,
}

const mutations = {
  SET_CALENDARIO (state,data) {
    state.calendario = data
  },
  SET_CALENDARIOS (state,data) {
    state.calendarios = data
  },
  SET_AGENDA (state,data) {
    state.agenda = data
  },
}

const actions = {
  setCalendarios (context, data) {
    context.commit('SET_CALENDARIOS',data)
  },
  setCalendario (context, data) {
    context.commit('SET_CALENDARIO',data)
  },
  setAgenda (context, data) {
    context.commit('SET_AGENDA',data)
  }
}

export default {
  state,
  mutations,
  actions
}
