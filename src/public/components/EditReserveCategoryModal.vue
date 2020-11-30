<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <h2>{{ `${mode === 'add' ? 'Add' : 'Edit'} Reserve Category` }}</h2>
      <div class="modalBody">
        <div class="flexcolumn">
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryName"
              >Reserve category abbreviated name</label
            >
            <input
              v-model="reserveCategory.name"
              class="textInput"
              name="categoryName"
              placeholder="e.g., clinical trial participant"
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
              v-model="reserveCategory.description"
              class="textInput textAreaInput"
              name="categoryDescription"
              placeholder="e.g., A clinical trial participant is defined as anyone who has enrolled in a COVID-19 Moderna clinical trial in the past 90 days."
            />
          </div>
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryDescription"
              >Reserve size</label
            >
            <input
              v-model="reserveCategory.size"
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
          <h4 class="mb-9 fw-n">Specification of priority order</h4>
          <div class="modalCriteriaTabs flexrow">
            <span
              v-for="(criteria, criteriaIndex) in reserveCategory.priority"
              :key="`criteria-tab-${criteriaIndex}`"
              :class="[
                'modalCriteriaTab',
                { isActive: criteriaIndex === currentCriteria },
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
          <div class="modalCriteriaPanels">
            <div
              v-for="(criteria, criteriaIndex) in reserveCategory.priority"
              :key="`criteria-panel-${criteriaIndex}`"
            >
              <PriorityOrderPanel
                v-if="criteriaIndex === currentCriteria"
                :criteria="criteria"
                :criteria-index="criteriaIndex"
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
            { isDisabled: hasSizeError || !reserveCategory.name },
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
import {
  CATEGORY_TYPE,
  NUMERIC_TYPE,
  categoryFields,
  numericFields,
} from './constants'

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
  components: { PriorityOrderPanel },
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
      initialSize: this.categoryToEdit.size,
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
  },
  mounted() {
    if (!this.reserveCategory.priority.length) {
      this.reserveCategory.priority = [{ ...deepClone(defaultCriteria) }]
    }
  },
  methods: {
    saveCategory() {
      if (!this.hasSizeError && this.reserveCategory.name) {
        const filteredPriorities = this.reserveCategory.priority.filter(
          (criteria) => criteria.name
        )
        this.$store.commit('saveCategory', {
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
    deleteCriteria(criteriaIndex) {},
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
  width: 90%;
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
}
.modalCriteriaPanels {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 0 0 18px 18px;
  max-height: 50vh;
  overflow: scroll;
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
