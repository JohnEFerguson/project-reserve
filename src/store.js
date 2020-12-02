import Vue from 'vue'
import Vuex from 'vuex'
import arrayMove from 'array-move'
import socket from './public/plugins/socket.io.js'
import { STATUS_UPDATE } from './socketConstants'
import {
  transformCriteriaForDisplay,
  transformCriteriaForPost,
  removeIds,
  trimStrings,
} from './public/plugins/helpers'

Vue.use(Vuex)

const generateDefaultCategory = (size) => ({
  name: 'unreserved_auto_populated',
  description: 'Default reserve category',
  size,
  order: 1,
  priority: [],
  isDefault: true,
})

const generateInitialState = () => ({
  isSocketConnected: false,
  reserveInstances: [],
  supplySum: 0,
  currentConfig: {
    unitType: '',
    supply: null,
    reserveCategories: [],
    requiredFields: [],
  },
})

function getBaseUrl() {
  const url =
    process &&
    process.env &&
    process.env.BASE_URL &&
    process.env.BASE_URL !== 'undefined' &&
    typeof process.env.BASE_URL !== undefined
      ? process.env.BASE_URL
      : 'http://localhost:8019'
  return url
}

export function createStore() {
  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => generateInitialState(),

    actions: {
      initSocket({ commit, state }) {
        if (!state.isSocketConnected) {
          commit('setSocketConnected')
          socket.on(STATUS_UPDATE, (reserveInstances) => {
            commit('setReserveInstances', reserveInstances)
          })
        }
      },
      async deleteCurrentConfig({ commit, state }) {
        if (state.currentConfig.id) {
          await fetch(
            `${getBaseUrl()}/configurations/${state.currentConfig.id}`,
            {
              method: 'DELETE',
            }
          )
          commit('deleteConfigIds')
        }
      },
      async getReserveInstances({ commit, state }) {
        const sourceFilesRes = await fetch(`${getBaseUrl()}/sourceFiles`)
        commit('setReserveInstances', await sourceFilesRes.json())
      },
      async processSourceFile({ commit }, sourceFileId) {
        await fetch(`${getBaseUrl()}/sourceFiles/${sourceFileId}/process`, {
          method: 'POST',
        })
        const sourceFilesRes = await fetch(`${getBaseUrl()}/sourceFiles`)
        commit('setReserveInstances', await sourceFilesRes.json())
      },
      async postConfig({ commit, state }) {
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
        const configRes = await fetch(`${getBaseUrl()}/configurations`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(configPayload),
        })
        const config = await configRes.json()
        commit('setConfig', {
          ...config,
          reserveCategories: config.reserveCategories.reduce(
            (acc, category) => {
              const formattedCategory = {
                ...category,
                priority: transformCriteriaForDisplay(category.priority),
              }
              acc.push(formattedCategory)
              return acc
            },
            []
          ),
        })
        const requiredFieldsRes = await fetch(
          `${getBaseUrl()}/configurations/${config.id}/fieldNames`
        )
        const requiredFields = await requiredFieldsRes.json()
        commit('setRequiredFields', requiredFields)
      },
      saveCategory({ commit, dispatch }, category) {
        commit('saveCategory', category)
        if (!category.isDefault) {
          commit('updateDefaultCategorySize')
        }
        commit('updateSupplySum')
      },
      deleteCategory({ commit, dispatch }, category) {
        commit('deleteCategory', category)
        commit('updateDefaultCategorySize')
        commit('updateSupplySum')
      },
      generateDefaultCategory({ commit, dispatch }, hasUpdatedSupply) {
        commit('generateDefaultCategory', hasUpdatedSupply)
        commit('updateDefaultCategorySize')
        commit('updateSupplySum')
      },
      async deleteReserveInstance({ commit, state }, instanceId) {
        await fetch(`/sourceFiles/${instanceId}`, {
          method: 'DELETE',
        })
        commit(
          'setReserveInstances',
          state.reserveInstances.filter(
            (instance) => instance.id !== instanceId
          )
        )
      },
      async deleteAllReserveInstances({ commit, state }, instanceId) {
        await fetch('/sourceFiles', {
          method: 'DELETE',
        })
        commit('setReserveInstances', [])
      },
    },

    mutations: {
      resetConfig(state) {
        const init = generateInitialState()
        Object.keys(init).forEach((key) => {
          state[key] = init[key]
        })
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
      generateDefaultCategory(state, hasUpdatedSupply) {
        const defaultCategory = state.currentConfig.reserveCategories.find(
          (el) => el.isDefault
        )
        if (!defaultCategory) {
          state.currentConfig.reserveCategories = [
            generateDefaultCategory(state.currentConfig.supply),
            ...state.currentConfig.reserveCategories,
          ]
        }
        if (hasUpdatedSupply) {
          state.currentConfig.reserveCategories = state.currentConfig.reserveCategories.map(
            (category) =>
              category.isDefault
                ? { ...category, size: state.currentConfig.supply }
                : { ...category, size: 0 }
          )
        }
      },
      updateSupplySum(state) {
        const sum = state.currentConfig.reserveCategories.reduce(
          (sum, category) => sum + parseInt(category.size),
          0
        )
        state.supplySum = sum
      },
      updateDefaultCategorySize(state) {
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
      saveCategory(state, cat) {
        const category = { ...cat }
        if (category.name) {
          category.name = (category.name || '').toLowerCase().replace(/ /g, '_')
        }
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
      deleteCategory(state, categoryToDelete) {
        if (!categoryToDelete.isDefault) {
          const filteredCategories = state.currentConfig.reserveCategories.filter(
            (category) => category.order !== categoryToDelete.order
          )
          filteredCategories.forEach((category, index) => {
            category.order = index + 1
          })
          state.currentConfig.reserveCategories = filteredCategories
        }
      },
      addReserveInstance(state, reserveInstance) {
        state.reserveInstances = [
          ...(state.reserveInstances || []),
          reserveInstance,
        ]
      },
      setReserveInstances(state, reserveInstances) {
        state.reserveInstances = reserveInstances
      },
      setSocketConnected(state) {
        if (!state.isSocketConnected) {
          state.isSocketConnected = true
        }
      },
      deleteConfigIds(state) {
        removeIds(state)
      },
    },
  })
}
