const generateDefaultCategory = (size) => ({
  name: 'Unreserved (auto-populated)',
  description: 'Default reserve category',
  size,
  order: 1,
  priority: {},
})

const initialState = {
  currentConfig: {
    unitType: '',
    supply: null,
    reserveCategories: [],
  },
}

export const state = () => initialState

export const mutations = {
  resetConfig(state, list) {
    state = initialState
  },
  updateUnitType(state, unitType) {
    state.currentConfig.unitType = unitType
  },
  updateSupply(state, supply) {
    state.currentConfig.supply = supply
  },
  generateDefaultCategory(state) {
    state.currentConfig.reserveCategories = [
      generateDefaultCategory(state.currentConfig.supply),
      ...state.currentConfig.reserveCategories,
    ]
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {},
}
