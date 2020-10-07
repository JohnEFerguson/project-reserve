import arrayMove from 'array-move'

const generateDefaultCategory = (size) => ({
  name: 'Unreserved (auto-populated)',
  description: 'Default reserve category',
  size,
  order: 1,
  priority: [{}],
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
  saveCategory(state, category) {
    if (category.order) {
      state.currentConfig.reserveCategories[category.order - 1] = category
    } else {
      const order = state.currentConfig.reserveCategories.length + 1
      state.currentConfig.reserveCategories = [
        ...state.currentConfig.reserveCategories,
        { ...category, order },
      ]
    }
  },
  moveCategory(state, { category, direction }) {
    let newIndex
    if (direction === 'down') {
      newIndex =
        category.order === state.currentConfig.reserveCategories.length
          ? 0
          : category.order
    } else if (direction === 'up') {
      newIndex =
        category.order === 1
          ? state.currentConfig.reserveCategories.length - 1
          : category.order - 2
    }
    const movedCategories = arrayMove(
      state.currentConfig.reserveCategories,
      category.order - 1,
      newIndex
    )
    movedCategories.forEach((category, index) => {
      category.order = index + 1
    })
    state.currentConfig.reserveCategories = movedCategories
  },
  deleteCategory(state, category) {},
}

export const actions = {
  async nuxtServerInit({ commit }) {},
}
