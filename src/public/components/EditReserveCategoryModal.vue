<template>
  <div class="modalWrapper">
    <CopyModal
      v-if="copyToShow"
      :copy="copyToShow"
      :on-close="closeCopyModal"
    />
    <div class="modalInnerWrapper">
      <h2>{{ `${mode === 'add' ? 'Add' : 'Edit'} Reserve Category` }}</h2>
      <div class="modalBody">
        <div class="flexcolumn">
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryName"
              >Reserve category abbreviated name<font-awesome-icon
                icon="info-circle"
                class="icon ml-9"
                @click="() => setCopyToShow('name')"
            /></label>
            <input
              v-model.trim="reserveCategory.name"
              class="textInput"
              name="categoryName"
              placeholder="e.g., clinical trial participant"
              :disabled="reserveCategory.isDefault"
              @input="validateCategoryName"
            />
            <span v-if="hasNameError" class="fs-12 mt-9 ml-18 col-error">{{
              `Please enter a name for the reserve category.`
            }}</span>
          </div>
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryDescription"
              >Description</label
            >
            <textarea
              v-model.trim="reserveCategory.description"
              class="textInput textAreaInput"
              name="categoryDescription"
              placeholder="e.g., A clinical trial participant is defined as anyone who has enrolled in a COVID-19 Moderna clinical trial in the past 90 days."
            />
          </div>
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryDescription"
              >Reserve size<font-awesome-icon
                icon="info-circle"
                class="icon ml-9"
                @click="() => setCopyToShow('size')"
            /></label>
            <input
              v-model.number="reserveCategory.size"
              class="textInput"
              name="categoryDescription"
              type="number"
              placeholder="e.g., 60"
              :min="0"
            />
            <span v-if="hasSizeError" class="fs-12 mt-9 ml-18 col-error">{{
              `There are only ${availableSupply} units available. Please re-allocate from other reserve categories, then enter a non-zero size.`
            }}</span>
          </div>
        </div>
        <div class="modalCriteriaWrapper">
          <h4 class="mb-9 fw-n">
            Specification of priority order<font-awesome-icon
              icon="info-circle"
              class="icon ml-9"
              @click="() => setCopyToShow('priority')"
            />
          </h4>
          <div class="modalCriteriaTabs flexrow">
            <span
              v-for="(criteria, criteriaIndex) in reserveCategory.priority"
              :key="`criteria-tab-${criteriaIndex}`"
              :class="[
                'modalCriteriaTab',
                {
                  isActive: criteriaIndex === currentCriteria,
                  hasError: !!criteriaErrors[criteriaIndex],
                },
              ]"
              @click="() => updateCriteriaTab(criteriaIndex)"
              >{{ `Criteria ${criteriaIndex + 1}` }}</span
            >
            <button
              v-if="reserveCategory.priority.length < 3"
              class="ml-9"
              @click="addNewCriteria"
            >
              +
            </button>
          </div>
          <div class="modalCriteriaPanels mb-18">
            <font-awesome-icon
              v-if="reserveCategory.priority.length > 1"
              icon="trash"
              class="deleteCriteriaButton"
              @click="deleteCurrentCriteria"
            >
              Delete
            </font-awesome-icon>
            <div
              v-for="(criteria, criteriaIndex) in reserveCategory.priority"
              :key="`criteria-panel-${criteriaIndex}`"
            >
              <PriorityOrderPanel
                v-if="criteriaIndex === currentCriteria"
                :criteria="criteria"
                :criteria-index="criteriaIndex"
                :validate-priorities="validatePriorities"
                :criteria-errors="criteriaErrors[criteriaIndex]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modalButtons">
        <button class="navButton" @click="onClose">Cancel</button>
        <button
          :class="[
            'navButton',
            {
              isDisabled:
                hasSizeError || !reserveCategory.name || hasCriteriaError,
            },
          ]"
          @click="saveCategory"
        >
          {{ `${mode === 'add' ? 'Add' : 'Edit'}` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PriorityOrderPanel from './PriorityOrderPanel.vue'
import CopyModal from './CopyModal.vue'

import {
  CATEGORY_TYPE,
  NUMERIC_TYPE,
  categoryFields,
  numericFields,
} from './constants'
import { editReserveCategoryCopyMap } from './constants'
import { checkBinRange } from '../plugins/helpers'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const defaultCriteria = {
  name: '',
  criteriaType: CATEGORY_TYPE,
  order: null,
  ...deepClone(categoryFields),
  ...deepClone(numericFields),
}
export default {
  components: { PriorityOrderPanel, CopyModal },
  props: {
    onClose: { type: Function, required: true },
    mode: { type: String, required: true },
    categoryToEdit: {
      type: Object,
      required: false,
      default: function defaultCategory() {
        return {
          name: '',
          description: '',
          size: 0,
          priority: [{ ...deepClone(defaultCriteria) }],
        }
      },
    },
  },
  data() {
    return {
      reserveCategory: deepClone(this.categoryToEdit),
      currentCriteria: 0,
      hasNameError: false,
      criteriaErrors: {},
      initialSize: this.categoryToEdit.size,
      copyToShow: null,
    }
  },
  computed: {
    availableSupply() {
      const defaultCategory = this.$store.state.currentConfig.reserveCategories.find(
        (cat) => !!cat.isDefault
      )
      if (defaultCategory) {
        return parseInt(this.initialSize) + parseInt(defaultCategory.size)
      }
      return this.$store.state.currentConfig.supply
    },
    CATEGORY_TYPE() {
      return CATEGORY_TYPE
    },
    NUMERIC_TYPE() {
      return NUMERIC_TYPE
    },
    hasSizeError() {
      return (
        parseInt(this.reserveCategory.size) > parseInt(this.availableSupply) ||
        this.reserveCategory.size < 0
      )
    },
    hasCriteriaError() {
      return Object.keys(this.criteriaErrors).reduce(
        (acc, key) => !!this.criteriaErrors[key] || acc,
        false
      )
    },
  },
  mounted() {
    if (!this.reserveCategory.priority.length) {
      this.reserveCategory.priority = [{ ...deepClone(defaultCriteria) }]
    }
  },
  methods: {
    validatePriorities() {
      const errors = {}
      this.reserveCategory.priority.forEach((criteria, index) => {
        if (!!criteria.name) {
          switch (criteria.criteriaType) {
            case CATEGORY_TYPE:
              const elements = criteria.elements.filter(({ name }) => !!name)
              if (!elements.length) {
                errors[index] = {
                  elements: 'You need at least 1 named element.',
                }
              } else {
                errors[index] = null
              }
              break
            case NUMERIC_TYPE:
              let numericError = {}
              if (criteria.max < criteria.min) {
                numericError.minMax =
                  'The max must be greater than or equal to the min.'
              }

              if (criteria.coarsened) {
                // confirm that Bin 1 has the correct min
                const bins = criteria.bins
                if (!bins.length) {
                  numericError.bins = 'Please enter at least 1 bin.'
                } else if (bins[0].min !== criteria.min) {
                  numericError.bins = `Bin 1 must have a min of ${criteria.min}.`
                } else if (bins[bins.length - 1].max !== criteria.max) {
                  numericError.bins = `Bin ${bins.length} must have a max of ${criteria.max}.`
                } else {
                  const binRangeError = checkBinRange({
                    bins: criteria.bins,
                    min: criteria.min,
                    max: criteria.max,
                  })
                  if (binRangeError) {
                    numericError.bins = binRangeError
                  }
                }
              }
              if (Object.keys(numericError).length) {
                errors[index] = { ...(errors[index] || {}), ...numericError }
              }
              break
            default:
              break
          }
        }
      })
      this.criteriaErrors = errors
    },
    closeCopyModal() {
      this.copyToShow = null
    },
    setCopyToShow(copyKey) {
      this.copyToShow = editReserveCategoryCopyMap[copyKey]
    },
    saveCategory() {
      if (!this.hasSizeError && this.reserveCategory.name) {
        const filteredPriorities = this.reserveCategory.priority.filter(
          (criteria) => criteria.name
        )
        this.$store.dispatch('saveCategory', {
          ...this.reserveCategory,
          priority: filteredPriorities,
        })
        this.onClose()
      } else {
        this.validateCategoryName()
      }
    },
    updateCriteriaTab(newIndex) {
      this.currentCriteria = newIndex
    },
    addNewCriteria() {
      if (this.reserveCategory.priority.length < 3) {
        this.reserveCategory.priority.push({
          ...deepClone(defaultCriteria),
        })
        this.updateCriteriaTab(this.reserveCategory.priority.length - 1)
      }
    },
    deleteCurrentCriteria() {
      const deletedLastCriteria =
        this.currentCriteria === this.reserveCategory.priority.length - 1
      this.reserveCategory.priority.splice(this.currentCriteria, 1)
      if (deletedLastCriteria) {
        this.$nextTick(() => {
          this.currentCriteria = this.currentCriteria - 1
        })
      }
      this.$nextTick(() => {
        this.validatePriorities()
      })
    },
    validateCategoryName() {
      this.hasNameError = !this.reserveCategory.name
    },
  },
}
</script>

<style scoped lang="stylus">
.modalWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
}
.modalInnerWrapper {
  height: calc(100% - 18px);
  width: 95%;
  border: 2px solid var(--dark-blue);
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 27px;
}
.modalBody {
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 27px;
  padding: 45px;
  margin: 27px;
  background: var(--light-grey);
  border-radius: 18px;
  max-height: 75%;
  overflow: auto;
}
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
.modalCriteriaTab {
  cursor: pointer;
  padding: 9px;
  background-color: var(--light-grey);
  color: var(--dark-blue);
  border-radius: 9px 9px 0 0;
  border: 2px solid var(--dark-blue);
  border-bottom: 0;
  &.isActive {
    background-color: var(--dark-blue);
    color: var(--light-grey);
  }
  &.hasError {
    background-color: #ff4242;
    border-color: #ff4242;
    &.isActive {
      border-color: black;
    }
    color: white;
  }
}
.modalCriteriaPanels {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 0 0 18px 18px;
  height: fit-content;
  max-height: 50vh;
  overflow: auto;
  position: relative;
}
.deleteCriteriaButton {
  position: absolute;
  top: 9px;
  right: 9px;
  cursor: pointer;
}
.textInput {
  cursor: pointer;
  resize: none;
  background-color: white;
  border: 2px solid var(--dark-grey);
  font-size: 20px;
  padding: 9px 18px;
  border-radius: 20px;
  outline: none;
  &::placeholder {
    color: #ddd;
  }
}
.textAreaInput {
  height: 200px;
  font-family: courier;
}
</style>
