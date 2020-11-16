<template>
  <div class="reserveContainer">
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
// function deepClone(obj) {
//   return JSON.parse(JSON.stringify(obj))
// }

export default {
  layout: 'configuration-screen',
  middleware: 'has-category',
  data() {
    return {}
  },
  computed: {
    reserveInstances() {
      return this.$store.state.reserveInstances
    },
  },
  methods: {},
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
