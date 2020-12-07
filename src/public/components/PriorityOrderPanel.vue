<template>
  <div>
    <div class="flexcolumn mb-27 mt-18">
      <label class="ml-9 mb-9" for="name">Criteria Name</label>
      <input
        v-model.trim="criteria.name"
        class="textInput"
        @input="runValidations"
        name="name"
        placeholder="e.g., sofa_score"
        :disabled="isReadOnly"
      />
      <div v-if="!isReadOnly" class="ml-9 mt-9 fs-12">
        Note: The criteria will not be saved unless you have entered a name.
      </div>
    </div>
    <div class="flexcolumn mb-27 mt-18">
      <label class="mb-9">Criteria Type</label>
      <div class="flexrow">
        <div class="flexrow">
          <input
            v-model="criteria.criteriaType"
            class="textInput"
            @change="runValidations"
            :name="`criteriaTypeCategory${criteriaIndex}`"
            type="radio"
            :value="CATEGORY_TYPE"
            :disabled="isReadOnly"
          />
          <label class="ml-9" :for="`criteriaTypeCategory${criteriaIndex}`"
            >Categorical</label
          >
        </div>
        <div class="flexrow ml-18">
          <input
            v-model="criteria.criteriaType"
            class="textInput"
            @change="runValidations"
            :name="`criteriaTypeNumeric${criteriaIndex}`"
            type="radio"
            :value="NUMERIC_TYPE"
            :disabled="isReadOnly"
          />
          <label class="ml-9" :for="`criteriaTypeNumeric${criteriaIndex}`"
            >Numeric</label
          >
        </div>
      </div>
    </div>

    <!-- CATEGORY FIELDS  -->

    <div v-if="criteria.criteriaType === CATEGORY_TYPE">
      <span
        v-if="criteriaErrors && criteriaErrors.elements"
        class="fs-12 mt-9 ml-18 col-error"
        >{{ criteriaErrors.elements }}</span
      >
      <div
        v-for="(element, elementIndex) in criteria.elements"
        :key="`criteria${criteriaIndex}category${elementIndex}`"
        class="flexrow mb-9"
      >
        <input
          v-model.trim="element.name"
          @input="runValidations"
          type="text"
          :name="`criteria${criteriaIndex}category${elementIndex}`"
          class="textInput"
          :placeholder="isReadOnly ? '' : 'e.g. Suffolk County'"
          :disabled="isReadOnly"
        />
        <div v-if="!isReadOnly" class="flexcolumn ml-9">
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
        <div v-if="!isReadOnly && criteria.elements.length > 1">
          <font-awesome-icon
            icon="trash"
            class="icon ml-9 cp fs-12"
            @click="() => deleteElement(element.order)"
          />
        </div>
      </div>
      <div v-if="!isReadOnly" class="flexrow ml-9 mt-9">
        <button class="mr-9" @click="addNewElement">+</button>
        Add new element
      </div>
    </div>

    <!-- NUMERIC FIELDS -->

    <div v-if="criteria.criteriaType === NUMERIC_TYPE">
      <span
        v-if="criteriaErrors && criteriaErrors.minMax"
        class="fs-12 mt-9 ml-9 col-error"
        >{{ criteriaErrors.minMax }}</span
      >
      <div :class="isReadOnly ? 'flexcolumn' : 'flexrow'">
        <div class="flexcolumn">
          <label class="ml-9" :for="`criteria${criteriaIndex}min`"
            >Criteria Minimum</label
          >
          <input
            v-model.number="criteria.min"
            @input="runValidations"
            type="number"
            class="textInput w50"
            :name="`criteria${criteriaIndex}min`"
            :disabled="isReadOnly"
          />
        </div>
        <div :class="`flexcolumn ${isReadOnly ? 'mt-9' : 'ml-18'}`">
          <label class="ml-9" :for="`criteria${criteriaIndex}max`"
            >Criteria Maximum</label
          >
          <input
            v-model.number="criteria.max"
            @input="runValidations"
            type="number"
            class="textInput w50"
            :name="`criteria${criteriaIndex}max`"
            :disabled="isReadOnly"
          />
        </div>
      </div>
      <div class="flexcolumn mt-18">
        <label class="mb-9">Criteria Sorting Order</label>
        <div class="flexrow">
          <div class="flexrow">
            <input
              v-model="criteria.ascending"
              class="textInput"
              :name="`criteriaBinOrderDesc${criteriaIndex}`"
              type="radio"
              :value="true"
              :disabled="isReadOnly"
            />
            <label class="ml-9" :for="`criteriaBinOrderDesc${criteriaIndex}`"
              >Lowest value prioritized</label
            >
          </div>
          <div class="flexrow ml-18">
            <input
              v-model="criteria.ascending"
              class="textInput"
              :name="`criteriaBinOrderAsc${criteriaIndex}`"
              type="radio"
              :value="false"
              :disabled="isReadOnly"
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
              @change="runValidations"
              class="textInput"
              :name="`criteriaCoarsenedYes${criteriaIndex}`"
              type="radio"
              :value="true"
              :disabled="isReadOnly"
            />
            <label class="ml-9" :for="`criteriaCoarsenedYes${criteriaIndex}`"
              >Yes</label
            >
          </div>
          <div class="flexrow ml-18">
            <input
              v-model="criteria.coarsened"
              @change="runValidations"
              class="textInput"
              :name="`criteriaCoarsenedNo${criteriaIndex}`"
              type="radio"
              :value="false"
              :disabled="isReadOnly"
            />
            <label class="ml-9" :for="`criteriaCoarsenedNo${criteriaIndex}`"
              >No</label
            >
          </div>
        </div>
      </div>
      <div v-if="criteria.coarsened" class="flexcolumn mt-18">
        <span
          v-if="criteriaErrors && criteriaErrors.bins"
          class="fs-12 mt-9 ml-9 col-error"
          >{{ criteriaErrors.bins }}</span
        >
        <span class="ml-9" :for="`criteriaNumBins${criteriaIndex}`">
          Number of bins
          <span class="iconWrapper">
            <font-awesome-icon
              icon="info-circle"
              class="icon ml-9"
              @mouseenter="() => setShowMinMaxNote(true)"
              @mouseleave="() => setShowMinMaxNote(false)"
            />
            <div :class="['descriptionWrapper', { isVisible: showMinMaxNote }]">
              It is important to know that a bin includes its min in the range
              but does not include its max. For example, the age bin 20-40 will
              include all individuals aged 20, 21, ..., 39 but will not include
              individuals aged 40. The exception is that the last bin will
              include the max in its range.
            </div>
          </span>
        </span>
        <input
          v-if="!isReadOnly"
          v-model.number="criteria.numBins"
          class="textInput w25"
          :name="`criteriaNumBins${criteriaIndex}`"
          type="number"
          @input="
            (e) => {
              updateNumBins(e.target.value)
              runValidations()
            }
          "
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
              v-model.number="bin.min"
              @input="runValidations"
              class="textInput w100"
              type="number"
              :name="`criteria${criteriaIndex}bin${binIndex}min`"
              :disabled="isReadOnly"
            />
          </div>
          <div class="flexcolumncenter w25">
            <label
              class="mb-9"
              :for="`criteria${criteriaIndex}bin${binIndex}max`"
              >Max</label
            >
            <input
              v-model.number="bin.max"
              @input="runValidations"
              class="textInput w100"
              type="number"
              :name="`criteria${criteriaIndex}bin${binIndex}max`"
              :disabled="isReadOnly"
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
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    criteriaErrors: {
      type: Object,
      default: null,
    },
    validatePriorities: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showMinMaxNote: false,
    }
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
    setShowMinMaxNote(showNote) {
      this.showMinMaxNote = showNote
    },
    runValidations() {
      this.$nextTick(() => {
        this.validatePriorities()
      })
    },
    addNewElement() {
      this.criteria.elements.push({
        name: '',
        order: this.criteria.elements.length + 1,
      })
    },
    deleteElement(order) {
      let elOrder = 1
      this.criteria.elements = this.criteria.elements.reduce((acc, el) => {
        if (el.order !== order) {
          acc.push({ ...el, order: elOrder })
          elOrder = elOrder + 1
        }
        return acc
      }, [])
      this.runValidations()
    },
    updateNumBins(numBins) {
      if (numBins < 0) {
        return
      }
      const newBins = []
      const currentBins = this.criteria.bins
      for (let i = 0; i < numBins; i++) {
        if (currentBins[i]) {
          newBins.push({ ...currentBins[i], order: i + 1 })
        } else {
          newBins.push({ min: 0, max: 0, order: i + 1 })
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

<style scoped lang="stylus">
.panelWrapper {
  position: relative;
}
.iconWrapper {
  position: relative;
}
.icon {
  cursor: pointer;
}
.descriptionWrapper {
  z-index: 1000;
  display: none;
  position: absolute;
  top: calc(100% + 9px);
  left: 50%;
  width: 350px;
  word-break: break-word;
  transform: translateX(-50%);
  left: calc(100% + 9px);
  background-color: white;
  border: 2px solid var(--dark-blue);
  padding: 9px;
  border-radius: 9px;
  &.isVisible {
    display: block;
  }
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
  &:disabled {
    padding: 0;
    text-align: center;
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
