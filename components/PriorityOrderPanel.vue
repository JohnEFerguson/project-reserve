<template>
  <div>
    <div class="flexcolumn mb-27 mt-18">
      <label class="ml-9 mb-9" for="criteriaName">Criteria Name</label>
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
            :name="`criteriaTypeCategory${criteriaIndex}`"
            type="radio"
            :value="CATEGORY_TYPE"
          />
          <label class="ml-9" :for="`criteriaTypeCategory${criteriaIndex}`"
            >Categorical</label
          >
        </div>
        <div class="flexrow ml-18">
          <input
            v-model="criteria.criteriaType"
            class="textInput"
            :name="`criteriaTypeNumeric${criteriaIndex}`"
            type="radio"
            :value="NUMERIC_TYPE"
          />
          <label class="ml-9" :for="`criteriaTypeNumeric${criteriaIndex}`"
            >Numeric</label
          >
        </div>
      </div>
    </div>

    <!-- CATEGORY FIELDS  -->

    <div v-if="criteria.criteriaType === CATEGORY_TYPE">
      <div
        v-for="(element, elementIndex) in criteria.elements"
        :key="`criteria${criteriaIndex}category${elementIndex}`"
        class="flexrow mb-9"
      >
        <input
          v-model="criteria.elements[elementIndex].name"
          type="text"
          :name="`criteria${criteriaIndex}category${elementIndex}`"
          class="textInput"
          placeholder="e.g. Suffolk County"
        />
        <div class="flexcolumn ml-9">
          <font-awesome-icon
            icon="arrow-up"
            class="icon mb-9 cp fs-12"
            @click="() => moveElementDown(element)"
          />
          <font-awesome-icon
            icon="arrow-down"
            class="icon cp fs-12"
            @click="() => moveElementUp(element)"
          />
        </div>
      </div>
      <div class="flexrow ml-9 mt-9">
        <button class="mr-9" @click="addNewElement">+</button>
        Add new element
      </div>
    </div>

    <!-- NUMERIC FIELDS -->

    <div v-if="criteria.criteriaType === NUMERIC_TYPE">
      <div class="flexrow">
        <div class="flexcolumn">
          <label class="ml-9" :for="`criteria${criteriaIndex}min`"
            >Criteria Minimum</label
          >
          <input
            v-model="criteria.min"
            type="number"
            class="textInput"
            :name="`criteria${criteriaIndex}min`"
          />
        </div>
        <div class="flexcolumn ml-18">
          <label class="ml-9" :for="`criteria${criteriaIndex}max`"
            >Criteria Maximum</label
          >
          <input
            v-model="criteria.max"
            type="number"
            class="textInput"
            :name="`criteria${criteriaIndex}max`"
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
              :name="`criteriaBinOrderDesc${criteriaIndex}`"
              type="radio"
              value="desc"
            />
            <label class="ml-9" :for="`criteriaBinOrderDesc${criteriaIndex}`"
              >Lowest value prioritized</label
            >
          </div>
          <div class="flexrow ml-18">
            <input
              v-model="criteria.binOrder"
              class="textInput"
              :name="`criteriaBinOrderAsc${criteriaIndex}`"
              type="radio"
              value="asc"
            />
            <label class="ml-9" :for="`criteriaBinOrderAsc${criteriaIndex}`"
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
              :name="`criteriaCoarsenedYes${criteriaIndex}`"
              type="radio"
              :value="true"
            />
            <label class="ml-9" :for="`criteriaCoarsenedYes${criteriaIndex}`"
              >Yes</label
            >
          </div>
          <div class="flexrow ml-18">
            <input
              v-model="criteria.coarsened"
              class="textInput"
              :name="`criteriaCoarsenedNo${criteriaIndex}`"
              type="radio"
              :value="false"
            />
            <label class="ml-9" :for="`criteriaCoarsenedNo${criteriaIndex}`"
              >No</label
            >
          </div>
        </div>
      </div>
      <div class="flexcolumn mt-18">
        <label class="ml-9" :for="`criteriaNumBins${criteriaIndex}`"
          >Number of bins</label
        >
        <input
          v-model="criteria.numBins"
          class="textInput w25"
          :name="`criteriaNumBins${criteriaIndex}`"
          type="number"
          @input="(e) => updateNumBins(e.target.value)"
        />
        <div class="divider mt-18 mb-18" />
        <div
          v-for="(bin, binIndex) in criteria.bins"
          :key="`criteria${criteriaIndex}bin${binIndex}`"
          class="flexrow-sa mb-9"
        >
          <label class="ml-9 mt-27 fw-b">{{ `Bin ${binIndex + 1}` }}</label>
          <div class="flexcolumncenter mr-9 w25">
            <label
              class="mb-9"
              :for="`criteria${criteriaIndex}bin${binIndex}min`"
              >Min</label
            >
            <input
              v-model="criteria.bins[binIndex].min"
              class="textInput w100"
              type="number"
              :name="`criteria${criteriaIndex}bin${binIndex}min`"
            />
          </div>
          <div class="flexcolumncenter w25">
            <label
              class="mb-9"
              :for="`criteria${criteriaIndex}bin${binIndex}max`"
              >Max</label
            >
            <input
              v-model="criteria.bins[binIndex].max"
              class="textInput w100"
              type="number"
              :name="`criteria${criteriaIndex}bin${binIndex}max`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import arrayMove from 'array-move'
import { CATEGORY_TYPE, NUMERIC_TYPE } from './constants'

export default {
  props: {
    criteria: {
      type: Object,
      required: true,
    },
    criteriaIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    CATEGORY_TYPE() {
      return CATEGORY_TYPE
    },
    NUMERIC_TYPE() {
      return NUMERIC_TYPE
    },
  },
  methods: {
    addNewElement() {
      this.criteria.elements.push({
        name: '',
        order: this.criteria.elements.length + 1,
      })
    },
    updateNumBins(numBins) {
      if (numBins < 0) {
        return
      }
      const newBins = []
      const currentBins = this.criteria.bins
      for (let i = 0; i < numBins; i++) {
        if (currentBins[i]) {
          newBins.push({ ...currentBins[i] })
        } else {
          newBins.push({ min: 0, max: 0 })
        }
      }
      this.criteria.bins = newBins
    },
    moveElementDown(element) {
      const elements = this.criteria.elements
      const newIndex =
        element.order === 1 ? elements.length - 1 : element.order - 2

      const movedElements = arrayMove(elements, element.order - 1, newIndex)
      movedElements.forEach((element, index) => {
        element.order = index + 1
      })

      this.criteria.elements = movedElements
    },
    moveElementUp(element) {
      const elements = this.criteria.elements
      const newIndex = element.order === elements.length ? 0 : element.order

      const movedElements = arrayMove(elements, element.order - 1, newIndex)
      movedElements.forEach((element, index) => {
        element.order = index + 1
      })

      this.criteria.elements = movedElements
    },
  },
}
</script>

<style scoped lang="scss">
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
.divider {
  height: 2px;
  border-radius: 18px;
  width: 100%;
  background-color: var(--dark-blue);
}
</style>
