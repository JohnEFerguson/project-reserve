<template>
  <div class="reserveContainer">
    <div class="reserveTableContainer">
      <div class="reserveTableLabels">
        <span>Date Created</span>
        <span>Name</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      <div class="reserveTableRows">
        <div
          v-for="instance in reserveInstances"
          :key="`${instance.name}`"
          class="reserveTableRow"
        >
          <span class="rowCell">{{ instance.date }}</span>
          <span class="rowCell">{{ instance.name }}</span>
          <span class="rowCell">{{ instance.status }}</span>
          <div class="actionButtons">
            <button>View Configuration</button>
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
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default {
  layout: 'configuration-screen',
  middleware: 'has-category',
  data() {
    return {
      viewReserveCategoryModalOpen: false,
      reserveConfigToView: null,
    }
  },
  computed: {
    totalSupply() {
      return this.$store.state.currentConfig.supply
    },
    allocationText() {
      return `${this.$store.state.currentConfig.supply} ${this.$store.state.currentConfig.unitType}`
    },
    reserveInstances() {
      return this.$store.state.currentConfig.reserveInstances
    },
  },
  methods: {
    openAddReserveCategoryModal() {
      this.editReserveCategoryModalMode = 'add'
      this.editReserveCategoryModalOpen = true
    },
    closeEditReserveCategoryModal() {
      this.editReserveCategoryModalOpen = false
      this.categoryToEdit = null
    },
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
    editCategory(category) {
      this.editReserveCategoryModalMode = 'edit'
      this.categoryToEdit = deepClone(category)
      this.$nextTick(() => {
        this.editReserveCategoryModalOpen = true
      })
    },
    moveCategoryUp(category) {
      this.$store.commit('moveCategory', { category, direction: 'up' })
    },
    moveCategoryDown(category) {
      this.$store.commit('moveCategory', { category, direction: 'down' })
    },
    postConfig() {
      this.$store.dispatch('postConfig')
    },
    calcSupplyPercent(size) {
      const percent = (size / this.totalSupply) * 100
      return percent % 1 > 0.5
        ? `${Math.ceil(percent)}%`
        : `${Math.floor(percent)}%`
    },
  },
}
</script>

<style scoped lang="scss">
.reserveContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  position: relative;
}
.reserveTableContainer {
  width: 100%;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.reserveTableLabels {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 1fr;
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
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 1fr;
  grid-gap: 18px;
  border-radius: 18px;
  text-align: center;
}
.rowCell {
  display: flex;
  justify-content: center;
  align-items: center;
}
.actionButtons {
  width: 75%;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
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
