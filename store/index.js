import arrayMove from 'array-move'
import pick from 'lodash.pick'
// import io from 'socket.io-client'

import {
  categoryFields,
  numericFields,
  CATEGORY_TYPE,
  NUMERIC_TYPE,
} from '../components/constants'

const generateDefaultCategory = (size) => ({
  name: 'Unreserved (auto-populated)',
  description: 'Default reserve category',
  size,
  order: 1,
  priority: [],
  isDefault: true,
})

const initialState = {
  socket: null,
  currentConfig: {
    unitType: '',
    supply: null,
    reserveCategories: [],
    requiredFields: [],
    reserveInstances: [],
  },
}

export const state = () => initialState

export const mutations = {
  resetConfig(state, list) {
    state = initialState
  },
  setConfig(state, config) {
    state.currentConfig = config
  },
  setRequiredFields(state, requiredFields) {
    state.currentConfig.requiredFields = requiredFields
  },
  updateUnitType(state, unitType) {
    state.currentConfig.unitType = unitType
  },
  updateSupply(state, supply) {
    state.currentConfig.supply = supply
  },
  generateDefaultCategory(state) {
    const defaultCategoryIndex = state.currentConfig.reserveCategories.findIndex(
      (el) => el.isDefault
    )
    if (defaultCategoryIndex >= 0) {
      state.currentConfig.reserveCategories[defaultCategoryIndex] = {
        ...generateDefaultCategory(state.currentConfig.supply),
        order: defaultCategoryIndex + 1,
      }
    } else {
      state.currentConfig.reserveCategories = [
        generateDefaultCategory(state.currentConfig.supply),
        ...state.currentConfig.reserveCategories,
      ]
    }
  },
  saveCategory(state, category) {
    if (category.priority) {
      category.priority = category.priority.map((criteria) => ({
        ...criteria,
        name: (criteria.name || '').toLowerCase().replace(/ /g, '_'), // Sofa Score -> sofa_score
      }))
    }
    if (category.order) {
      state.currentConfig.reserveCategories[category.order - 1] = category
    } else {
      const order = state.currentConfig.reserveCategories.length + 1
      state.currentConfig.reserveCategories.push({ ...category, order })
    }
    const defaultCategory = state.currentConfig.reserveCategories.find(
      (el) => el.isDefault
    )
    if (defaultCategory) {
      const nonDefaultCategoriesAllocation = state.currentConfig.reserveCategories
        .filter((cat) => !cat.isDefault)
        .reduce((acc, cat) => {
          return acc + parseInt(cat.size)
        }, 0)
      defaultCategory.size =
        state.currentConfig.supply - nonDefaultCategoriesAllocation
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
  addReserveInstance(state, reserveInstance) {
    state.reserveInstances = [...state.reserveInstances, reserveInstance]
  },
}

function transformCriteriaForPost(priority) {
  if (!priority) {
    return null
  }
  const categoryCriteria = []
  const numericCriteria = []

  const priorityMap = {
    [CATEGORY_TYPE]: {
      bucket: categoryCriteria,
      fields: categoryFields,
    },
    [NUMERIC_TYPE]: {
      bucket: numericCriteria,
      fields: numericFields,
    },
  }
  priority.forEach((criteria, index) => {
    const { bucket, fields } = priorityMap[criteria.criteriaType]
    bucket.push({
      order: index + 1,
      ...pick(criteria, ['name', ...Object.keys(fields)]),
    })
  })
  return {
    categoryCriteria,
    numericCriteria,
  }
}

function transformCriteriaForDisplay(priority) {
  if (!priority) {
    return null
  }
  const criterias = []
  priority.categoryCriteria.forEach(
    (crit) =>
      (criterias[crit.order - 1] = {
        ...crit,
        criteriaType: CATEGORY_TYPE,
      })
  )
  priority.numericCriteria.forEach(
    (crit) =>
      (criterias[crit.order - 1] = {
        ...crit,
        criteriaType: NUMERIC_TYPE,
      })
  )
  return criterias
}

export const actions = {
  async nuxtServerInit({ commit }) {},
  async postConfig({ commit, state, ...props }) {
    const configPayload = {
      unitType: state.currentConfig.unitType,
      supply: state.currentConfig.supply,
      reserveCategories: state.currentConfig.reserveCategories.reduce(
        (acc, category) => {
          const formattedCategory = {
            ...category,
            priority: transformCriteriaForPost(category.priority),
          }
          acc.push(formattedCategory)
          return acc
        },
        []
      ),
    }
    const configRes = await fetch('/api/configurations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(configPayload),
    })
    const config = await configRes.json()
    commit('setConfig', {
      ...config,
      reserveCategories: config.reserveCategories.reduce((acc, category) => {
        const formattedCategory = {
          ...category,
          priority: transformCriteriaForDisplay(category.priority),
        }
        acc.push(formattedCategory)
        return acc
      }, []),
    })
    const requiredFieldsRes = await fetch(
      `/api/configurations/${config.id}/fieldNames`
    )
    const requiredFields = await requiredFieldsRes.json()
    commit('setRequiredFields', requiredFields)
    this.app.router.push('/finish')
  },
}
