<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <h2>{{ `${mode === 'add' ? 'Add' : 'Edit'} Reserve Category` }}</h2>
      <div class="modalBody">
        <div class="modalTextFields">
          <div class="flexcolumn mb-27">
            <label class="ml-9 mb-9" for="categoryName"
              >Reserve category abbreviated name</label
            >
            <input
              v-model="reserveCategory.name"
              class="textInput"
              name="categoryName"
              placeholder="e.g., clinical trial participant"
            />
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
            />
          </div>
        </div>
        <div class="modalCriteriaWrapper">
          <h4 class="mb-9 fw-n">Specification of priority order</h4>
          <div class="modalCriteriaTabs flexrow">
            <span
              v-for="(criteria, index) in reserveCategory.priority"
              :key="`criteria-tab-${index}`"
              :class="[
                'modalCriteriaTab',
                { isActive: index === currentCriteria },
              ]"
              @click="() => updateCriteriaTab(index)"
              >{{ `Criteria ${index + 1}` }}</span
            >
            <button class="ml-9" @click="addNewCriteria">+</button>
          </div>
          <div class="modalCriteriaPanels">
            <div
              v-for="(criteria, index) in reserveCategory.priority"
              :key="`criteria-panel-${index}`"
              :class="[
                'modalCriteriaPanel',
                { isCurrentPanel: index === currentCriteria },
              ]"
            >
              <div class="flexcolumn mb-27 mt-18">
                <label class="ml-9 mb-9" for="criteriaName"
                  >Criteria Name</label
                >
                <input
                  v-model="criteria.name"
                  class="textInput"
                  name="criteriaName"
                  placeholder="e.g., sofa_score"
                />
              </div>
              <div class="flexcolumn mb-27 mt-18">
                <label class="mb-9">Criteria Type</label>
                <div class="flexrow">
                  <div class="flexrow">
                    <input
                      v-model="criteria.criteriaType"
                      class="textInput"
                      :name="`criteriaTypeCategory${index}`"
                      type="radio"
                      :value="CATEGORY_TYPE"
                    />
                    <label class="ml-9" :for="`criteriaTypeCategory${index}`"
                      >Categorical</label
                    >
                  </div>
                  <div class="flexrow ml-18">
                    <input
                      v-model="criteria.criteriaType"
                      class="textInput"
                      :name="`criteriaTypeNumeric${index}`"
                      type="radio"
                      :value="NUMERIC_TYPE"
                    />
                    <label class="ml-9" :for="`criteriaTypeNumeric${index}`"
                      >Numeric</label
                    >
                  </div>
                </div>
              </div>
              <div v-if="criteria.criteriaType === CATEGORY_TYPE">
                <div
                  v-for="(element, elementIndex) in reserveCategory.priority[
                    index
                  ].elements"
                  :key="`criteria${index}category${elementIndex}`"
                >
                  <input
                    v-model="criteria.elements[elementIndex]"
                    type="text"
                    :name="`criteria${index}category${elementIndex}`"
                    class="textInput mb-9"
                    placeholder="e.g. Suffolk County"
                  />
                </div>
                <div class="flexrow ml-9 mt-9">
                  <button class="mr-9" @click="() => addNewElement(index)">
                    +
                  </button>
                  Add new element
                </div>
              </div>
              <div v-if="criteria.criteriaType === NUMERIC_TYPE">
                <div class="flexrow">
                  <div class="flexcolumn">
                    <label class="ml-9" :for="`criteria${index}min`"
                      >Criteria Minimum</label
                    >
                    <input
                      v-model="criteria.min"
                      type="number"
                      class="textInput"
                      :name="`criteria${index}min`"
                    />
                  </div>
                  <div class="flexcolumn ml-18">
                    <label class="ml-9" :for="`criteria${index}max`"
                      >Criteria Maximum</label
                    >
                    <input
                      v-model="criteria.max"
                      type="number"
                      class="textInput"
                      :name="`criteria${index}max`"
                    />
                  </div>
                </div>
                <div class="flexcolumn mt-18">
                  <label class="mb-9">Criteria Sorting Order</label>
                  <div class="flexrow">
                    <div class="flexrow">
                      <input
                        v-model="criteria.binOrder"
                        class="textInput"
                        :name="`criteriaBinOrderDesc${index}`"
                        type="radio"
                        value="desc"
                      />
                      <label class="ml-9" :for="`criteriaBinOrderDesc${index}`"
                        >Lowest value prioritized</label
                      >
                    </div>
                    <div class="flexrow ml-18">
                      <input
                        v-model="criteria.binOrder"
                        class="textInput"
                        :name="`criteriaBinOrderAsc${index}`"
                        type="radio"
                        value="asc"
                      />
                      <label class="ml-9" :for="`criteriaBinOrderAsc${index}`"
                        >Highest value prioritized</label
                      >
                    </div>
                  </div>
                </div>
                <div class="flexcolumn mt-18">
                  <label class="mb-9">Coarsened Status</label>
                  <div class="flexrow">
                    <div class="flexrow">
                      <input
                        v-model="criteria.coarsened"
                        class="textInput"
                        :name="`criteriaCoarsenedYes${index}`"
                        type="radio"
                        :value="true"
                      />
                      <label class="ml-9" :for="`criteriaCoarsenedYes${index}`"
                        >Yes</label
                      >
                    </div>
                    <div class="flexrow ml-18">
                      <input
                        v-model="criteria.coarsened"
                        class="textInput"
                        :name="`criteriaCoarsenedNo${index}`"
                        type="radio"
                        :value="false"
                      />
                      <label class="ml-9" :for="`criteriaCoarsenedNo${index}`"
                        >No</label
                      >
                    </div>
                  </div>
                </div>
                <div class="flexcolumn mt-18">
                  <label class="ml-9" :for="`criteriaNumBins${index}`"
                    >Number of bins</label
                  >
                  <input
                    v-model="criteria.numBins"
                    class="textInput w25"
                    :name="`criteriaNumBins${index}`"
                    type="number"
                    @input="
                      (e) =>
                        updateNumBins({
                          priorityIndex: index,
                          numBins: e.target.value,
                        })
                    "
                  />
                  <div class="divider mt-18 mb-18" />
                  <div
                    v-for="(bin, binIndex) in criteria.bins"
                    :key="`criteria${index}bin${binIndex}`"
                    class="flexrow-sa mb-9"
                  >
                    <label class="ml-9 mt-27 fw-b">{{
                      `Bin ${binIndex + 1}`
                    }}</label>
                    <div class="flexcolumncenter mr-9 w25">
                      <label
                        class="mb-9"
                        :for="`criteria${index}bin${binIndex}min`"
                        >Min</label
                      >
                      <input
                        v-model="criteria.bins[binIndex].min"
                        class="textInput w100"
                        :name="`criteria${index}bin${binIndex}min`"
                      />
                    </div>
                    <div class="flexcolumncenter w25">
                      <label
                        class="mb-9"
                        :for="`criteria${index}bin${binIndex}max`"
                        >Max</label
                      >
                      <input
                        v-model="criteria.bins[binIndex].max"
                        class="textInput w100"
                        :name="`criteria${index}bin${binIndex}max`"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modalButtons">
        <button class="navButton" @click="onClose">Cancel</button>
        <button class="navButton" @click="saveCategory">
          {{ `${mode === 'add' ? 'Add' : 'Edit'}` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const categoryFields = {
  elements: [''],
}
const numericFields = {
  min: 0,
  max: 0,
  binOrder: 'desc',
  coarsened: true,
  numBins: 1,
  bins: [
    {
      min: 0,
      max: 0,
    },
  ],
}
const CATEGORY_TYPE = 'categorical'
const NUMERIC_TYPE = 'numeric'
const defaultCriteria = {
  criteriaName: '',
  criteriaType: CATEGORY_TYPE,
  order: null,
  ...deepClone(categoryFields),
  ...deepClone(numericFields),
}
export default {
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
    }
  },
  computed: {
    reserveCategoryFiltered() {
      const priorities = this.reserveCategory.priority
      const filteredPriorities = priorities.reduce((acc, priority) => {
        const filteredPriority = {}
        Object.keys(priority).forEach((key) => {
          if (priority.criteriaType === CATEGORY_TYPE) {
            if (categoryFields[key]) {
              filteredPriority[key] = priority[key]
            }
          } else if (numericFields[key]) {
            filteredPriority[key] = priority[key]
          }
        })
        acc.push(filteredPriority)
        return acc
      }, [])
      return filteredPriorities
    },
    CATEGORY_TYPE() {
      return CATEGORY_TYPE
    },
    NUMERIC_TYPE() {
      return NUMERIC_TYPE
    },
  },
  methods: {
    saveCategory() {
      this.$store.commit('saveCategory', this.reserveCategory)
      this.onClose()
    },
    updateCriteriaTab(newIndex) {
      this.currentCriteria = newIndex
    },
    addNewCriteria() {
      this.reserveCategory.priority.push({
        ...deepClone(defaultCriteria),
      })
    },
    addNewElement(priorityIndex) {
      this.reserveCategory.priority[priorityIndex].elements.push('')
    },
    updateNumBins({ priorityIndex, numBins }) {
      if (numBins < 0) {
        return
      }
      const newBins = []
      const currentBins = this.reserveCategory.priority[priorityIndex].bins
      for (let i = 0; i < numBins; i++) {
        if (currentBins[i]) {
          newBins.push({ ...currentBins[i] })
        } else {
          newBins.push({ min: 0, max: 0 })
        }
      }
      this.reserveCategory.priority[priorityIndex].bins = newBins
    },
  },
}
</script>

<style scoped lang="scss">
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
}
.modalInnerWrapper {
  height: 90%;
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
}
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.modalTextFields {
  display: flex;
  flex-direction: column;
  //   justify-content: space-around;
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
}
.modalCriteriaWrapper {
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
  max-height: 55vh;
  overflow: scroll;
}
.modalCriteriaPanel {
  display: none;
  &.isCurrentPanel {
    display: block;
  }
}
.divider {
  height: 2px;
  border-radius: 18px;
  width: 100%;
  background-color: var(--dark-blue);
}
</style>
