// import get from 'lodash.get'

import initialState from './initialState'

export const state = () => initialState

export const mutations = {
  resetState(state, list) {
    state = initialState
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {},
}
