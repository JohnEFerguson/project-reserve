<template>
  <div class="configSummaryContainer">
    <div class="finishConfirmationData">
      <div class="flexrow mb-18">
        <strong class="fw-b mr-9">Unit allocated: </strong
        ><span>{{ unitType }}</span>
      </div>
      <div class="flexrow mb-18">
        <strong class="fw-b mr-9">Number of units allocated: </strong
        ><span>{{ supply }}</span>
      </div>
      <div class="reserveTableContainer">
        <div class="reserveTableLabels">
          <span>Processing Order</span>
          <span>Reserve Category Name</span>
          <span>Size</span>
          <span>Priority Order</span>
        </div>
        <div class="reserveTableRows">
          <div
            v-for="(category, index) in reserveCategories"
            :key="`${category.name}${category.order}`"
            class="reserveTableRow"
          >
            <span class="rowCell">{{ index + 1 }}</span>
            <span class="rowCell"
              >{{ category.name
              }}<span v-if="category.description" class="iconWrapper"
                ><font-awesome-icon
                  icon="info-circle"
                  class="icon ml-9"
                  @mouseenter="() => setDescriptionIndexToShow(index)"
                  @mouseleave="() => setDescriptionIndexToShow(null)"
                />
                <div
                  :class="[
                    'descriptionWrapper',
                    { isVisible: descriptionIndexToShow === index },
                  ]"
                >
                  {{ category.description }}
                </div></span
              ></span
            >
            <span class="rowCell">{{ category.size }}</span>
            <button class="p9" @click="() => onPriorityClick(category)">
              {{ 'Priority' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="requiredFields.length" class="requiredFieldsWrapper">
      <p class="mb-18">
        This configuration will
        <strong>require the following data fields</strong> for every potential
        recipient. Please ensure that this data is readily available before
        continuing.
      </p>
      <p class="mb-27">
        A user can optionally include their own random number for a patient by
        including a field exactly named random_number. If a patient has a blank
        random number or random number not in the range 0 to 100000, the system
        will generate and report its own random number for the patient.
      </p>
      <div class="mb-18 fw-b">Required fields:</div>
      <p
        v-for="field in requiredFields"
        :key="field.name"
        class="mb-9 requiredField"
      >
        {{ field.name }}<span v-if="!field.required">*</span>
      </p>
      <div class="mt-18">*Not required for all recipients inputted</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    onPriorityClick: {
      type: Function,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      descriptionIndexToShow: null,
    }
  },
  computed: {
    reserveCategories() {
      return (this.config.reserveCategories || []).filter(
        (cat) => parseInt(cat.size) > 0
      )
    },
    unitType() {
      return this.config.unitType
    },
    supply() {
      return this.config.supply
    },
    requiredFields() {
      return this.config.requiredFields || []
    },
  },
  methods: {
    setDescriptionIndexToShow(index) {
      this.descriptionIndexToShow = index
    },
  },
}
</script>
<style scoped lang="stylus">
.configSummaryContainer {
  grid-column: span 3;
  margin: auto;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 27px;
}
.finishConfirmationData {
  grid-column: span 2;
  &:last-child {
    grid-column: span 3;
  }
}
.reserveTableContainer {
  width: 100%;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.reserveTableLabels {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  grid-gap: 18px;
  padding: 18px;
  border-bottom: 2px solid var(--dark-blue);
  text-align: center;
}
.reserveTableRows {
  background: var(--light-grey);
  border-radius: 0 0 18px 18px;
}
.reserveTableRow {
  display: grid;
  padding: 18px;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  grid-gap: 18px;
  border-radius: 18px;
  text-align: center;
}
.rowCell {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  word-break: break-word;
}
.requiredFieldsWrapper {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
  overflow: auto;
  max-height: 500px;
}
.requiredField {
  border-radius: 18px;
  background-color: var(--light-grey);
  padding: 9px 18px;
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
  top: 50%;
  width: 250px;
  word-break: break-word;
  transform: translateY(-50%);
  left: calc(100% + 9px);
  background-color: white;
  border: 2px solid var(--dark-blue);
  padding: 9px;
  border-radius: 9px;
  &.isVisible {
    display: block;
  }
}
</style>
