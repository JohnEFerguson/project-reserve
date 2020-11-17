<template>
  <div class="reserveContainer">
    <ViewPriorityOrderModal
      v-if="viewPriorityOrderModalOpen"
      :on-close="closeViewPriorityOrderModal"
      :reserve-category="reserveCategoryToView"
    />
    <div class="reserveTableContainer">
      <div class="reserveTableLabels">
        <label class="label">Date Created</label>
        <label class="label">Name</label>
        <label class="label">Status</label>
        <label class="actionLabel">Action</label>
      </div>
      <div v-if="reserveInstances" class="reserveTableRows">
        <div
          v-for="instance in reserveInstances"
          :key="`${instance.id}`"
          class="reserveTableRow"
        >
          <span class="rowCell">{{ instance.dateLoaded }}</span>
          <span class="rowCell">{{ instance.name }}</span>
          <span class="rowCell">{{ instance.status }}</span>
          <div class="actionButtons">
            <button @click="() => viewPriorityOrder(instance)">
              View Configuration
            </button>
            <button>Export Results</button>
          </div>
        </div>
        <div class="buttonWrapper">
          <nuxt-link to="/create" class="p-18">
            Add New Reserve Instance
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="navButtons">
      <nuxt-link to="/load-data" class="navButton">Back</nuxt-link>
    </div>
  </div>
</template>

<script>
import ViewPriorityOrderModal from '~/components/ViewPriorityOrderModal.vue'

export default {
  layout: 'default',
  middleware: 'has-category',
  components: { ViewPriorityOrderModal },
  data() {
    return {
      viewPriorityOrderModalOpen: false,
      reserveCategoryToView: null,
    }
  },
  computed: {
    reserveInstances() {
      return (this.$store.state.reserveInstances || []).map((instance) => ({
        ...instance,
        dateLoaded: new Date(instance.dateLoaded).toLocaleDateString(),
      }))
    },
  },
  methods: {
    closeViewPriorityOrderModal() {
      this.viewPriorityOrderModalOpen = false
      this.reserveCategoryToView = null
    },
    async viewPriorityOrder(instance) {
      const config = await fetch(
        `/api/configurations/${instance.configurationId}`
      )
      this.reserveCategoryToView = config
      this.$nextTick(() => {
        this.viewPriorityOrderModalOpen = true
      })
    },
  },
}
</script>

<style scoped lang="scss">
.reserveContainer {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.reserveTableContainer {
  width: 90%;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.reserveTableLabels {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
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
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 18px;
  border-radius: 18px;
  text-align: center;
}
.rowCell {
  grid-column: span 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  grid-column: span 3;
}
.actionLabel {
  grid-column: span 3;
}
.actionButtons {
  grid-column: span 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    padding: 18px;
  }
}
.buttonWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0;
}

.navButtons {
  margin-top: 18px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tableFooter {
  color: var(--dark-grey);
}
.allocationText {
  color: var(--dark-blue);
}
.icon {
  cursor: pointer;
}
</style>
