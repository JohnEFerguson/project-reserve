<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <PrioritySummary
        v-if="priorityToView"
        :reserve-category="priorityToView"
      />
      <ConfigSummary
        v-if="!priorityToView"
        :config="config"
        :on-priority-click="goToPrioritySummary"
      />
      <div class="modalButtons">
        <button class="navButton" @click="handleOnClose">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import PrioritySummary from './PrioritySummary'
import ConfigSummary from './ConfigSummary'
export default {
  components: { PrioritySummary, ConfigSummary },
  props: {
    config: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      priorityToView: null,
    }
  },
  computed: {
    reserveCategories() {
      return this.config.reserveCategories || []
    },
    unitType() {
      return this.config.unitType
    },
    supply() {
      return this.config.supply
    },
  },
  methods: {
    handleOnClose() {
      if (this.priorityToView) {
        this.priorityToView = null
      } else {
        this.onClose()
      }
    },
    goToPrioritySummary(category) {
      this.priorityToView = category
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
  z-index: 100;
}
.modalInnerWrapper {
  height: fit-content;
  max-height: 90%;
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
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
}
</style>
