<template>
  <div class="finishContainer">
    <ViewPriorityOrderModal
      v-if="viewPriorityOrderModalOpen"
      :on-close="closeViewPriorityOrderModal"
      :reserve-category="reserveCategoryToView"
    />
    <h3 class="finishConfirmationText mb-18">
      Please confirm that the specified reserve configuration is correct before
      clicking Finish
    </h3>
    <div class="finishConfirmationData">
      <div class="flexrow mb-18">
        <strong class="fw-b">Unit allocated: </strong
        ><span>{{ unitType }}</span>
      </div>
      <div class="flexrow mb-18">
        <strong class="fw-b">Number of units allocated: </strong
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
            v-for="category in reserveCategories"
            :key="`${category.name}${category.order}`"
            class="reserveTableRow"
          >
            <span class="rowCell">{{ category.order }}</span>
            <span class="rowCell">{{ category.name }}</span>
            <span class="rowCell">{{ category.size }}</span>
            <button class="p9" @click="() => viewPriorityOrder(category)">
              {{ 'Priority' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="requiredFieldsWrapper">
      <p class="mb-27">
        This configuration will
        <strong>require the following data fields</strong> for every potential
        recipient of a vaccine. Please ensure that this data is readily
        available before continuing.
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
    <div class="navButtons">
      <nuxt-link to="/specify-reserve" class="navButton">Back</nuxt-link>
      <nuxt-link to="/load-data" class="navButton">Next</nuxt-link>
    </div>
  </div>
</template>

<script>
import ViewPriorityOrderModal from '~/components/ViewPriorityOrderModal.vue'

export default {
  layout: 'configuration-screen',
  middleware: 'has-category',
  components: { ViewPriorityOrderModal },
  data() {
    return {
      viewPriorityOrderModalOpen: false,
      reserveCategoryToView: null,
    }
  },
  computed: {
    supply() {
      return this.$store.state.currentConfig.supply
    },
    unitType() {
      return this.$store.state.currentConfig.unitType
    },
    reserveCategories() {
      return this.$store.state.currentConfig.reserveCategories
    },
    requiredFields() {
      return this.$store.state.currentConfig.requiredFields
    },
  },
  methods: {
    closeViewPriorityOrderModal() {
      this.viewPriorityOrderModalOpen = false
      this.reserveCategoryToView = null
    },
    viewPriorityOrder(category) {
      this.reserveCategoryToView = category
      this.$nextTick(() => {
        this.viewPriorityOrderModalOpen = true
      })
    },
  },
}
</script>

<style scoped lang="scss">
.finishContainer {
  flex: 1;
  margin: auto;
  width: 90vw;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content min-content min-content;
  grid-gap: 27px;
}
.finishConfirmationText {
  grid-column: span 3;
  text-align: center;
}
.finishConfirmationData {
  grid-column: span 2;
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
}
.requiredFieldsWrapper {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.requiredField {
  border-radius: 18px;
  background-color: var(--light-grey);
  padding: 9px 18px;
}
.navButtons {
  margin-top: 18px;
  grid-column: span 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
