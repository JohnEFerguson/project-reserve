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
    <ConfigSummary
      :on-priority-click="() => viewPriorityOrder(category)"
      :config="currentConfig"
    />
    <div class="navButtons">
      <nuxt-link
        to="/specify-reserve"
        class="navButton"
        @click.native="deleteCurrentConfig"
        >Back</nuxt-link
      >
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
    currentConfig() {
      return this.$store.state.currentConfig
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
    deleteCurrentConfig() {
      this.$store.dispatch('deleteCurrentConfig')
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
.navButtons {
  margin-top: 18px;
  grid-column: span 3;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
