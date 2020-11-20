<template>
  <div class="reserveContainer">
    <h1 class="header">Project Reserve</h1>
    <ViewConfigModal
      v-if="viewConfigModalOpen"
      :on-close="closeViewConfigModal"
      :config="configToView"
    />
    <h2 class="tableLabel mb-9 fs-16 fw-n">Database of reserve instances</h2>
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
            <button @click="() => viewConfig(instance)">
              View Configuration
            </button>
            <button class="exportResultsBtn">
              Export Results ▼
              <span class="resultsOptions">
                <button @click="() => exportAll(instance)">
                  Export all participants as CSV
                </button>
                <button @click="() => exportWinners(instance)">
                  Export list of allocation recipients as CSV
                </button>
                <button @click="() => exportLosers(instance)">
                  Export list of allocation non-recipients as CSV
                </button>
              </span>
            </button>
          </div>
        </div>
        <div class="buttonWrapper">
          <button class="p-18">
            <nuxt-link to="/create" class="addButton">
              Add New Reserve Instance
            </nuxt-link>
          </button>
        </div>
      </div>
    </div>
    <div class="navButtons">
      <nuxt-link to="/load-data" class="navButton">Back</nuxt-link>
    </div>
  </div>
</template>

<script>
import path from 'path-browserify'
import { unparse } from 'papaparse'
import { transformCriteriaForDisplay, downloadCSV } from '../plugins/helpers'
import ViewConfigModal from '~/components/ViewConfigModal.vue'

export default {
  layout: 'default',
  middleware: 'has-category',
  components: { ViewConfigModal },
  data() {
    return {
      viewConfigModalOpen: false,
      configToView: null,
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
    closeViewConfigModal() {
      this.viewConfigModalOpen = false
      this.configToView = null
    },
    async viewConfig(instance) {
      const configRes = await fetch(
        `/api/configurations/${instance.configurationId}`
      )
      const config = await configRes.json()
      const requiredFieldsRes = await fetch(
        `/api/configurations/${config.id}/fieldNames`
      )
      const requiredFields = await requiredFieldsRes.json()
      this.configToView = {
        ...config,
        requiredFields,
        reserveCategories: config.reserveCategories.reduce((acc, category) => {
          const formattedCategory = {
            ...category,
            priority: transformCriteriaForDisplay(category.priority),
          }
          acc.push(formattedCategory)
          return acc
        }, []),
      }
      this.$nextTick(() => {
        this.viewConfigModalOpen = true
      })
    },
    sortByLabel(priority) {
      const sortOrders = (priority || []).map((cat) => `by ${cat.name}`)
      if ((sortOrders || []).length < 3) {
        sortOrders.push('by random lottery tiebreaker')
      }
      return `Sort ${(sortOrders || []).join(', ')}`
    },
    async export({ instance, patients, suffix }) {
      const configurationRes = await fetch(
        `/api/configurations/${instance.configurationId}`
      )
      const configuration = await configurationRes.json()
      const parsedFileName = path.parse(instance.name).name
      const today = new Date()
      downloadCSV({
        content: unparse([
          [
            `${today.toLocaleDateString()} ${today.toLocaleTimeString()} Allocation of ${
              configuration.unitType
            } using ${parsedFileName}`,
          ],
          [],
          [`Number Allocated: ${configuration.supply}`],
          ['Reserve Categories'],
          ...configuration.reserveCategories.map((category) => [
            '',
            `${category.name} (size = ${
              category.size
            }, priority order: ${this.sortByLabel(
              transformCriteriaForDisplay(category.priority)
            )})`,
          ]),
          [],
          [],
          [],
          patients.length
            ? Object.keys(patients[0])
            : ['No patients to display'],
          ...patients.map(Object.values),
        ]),
        fileName: `${parsedFileName}${suffix}`,
      })
    },
    async exportAll(instance) {
      const patientsRes = await fetch(
        `/api/sourceFiles/${instance.id}/patients`
      )
      const patients = await patientsRes.json()
      this.export({ instance, patients, suffix: '_all_patients' })
    },
    async exportWinners(instance) {
      const winnersRes = await fetch(
        `/api/sourceFiles/${instance.id}/patients?givenUnit=true`
      )
      const patients = await winnersRes.json()
      this.export({ instance, patients, suffix: '_recipients' })
    },
    async exportLosers(instance) {
      const losersRes = await fetch(
        `/api/sourceFiles/${instance.id}/patients?givenUnit=false`
      )
      const patients = await losersRes.json()
      this.export({ instance, patients, suffix: '_non_recipients' })
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  padding: 18px 45px;
  color: var(--dark-blue);
  background-color: var(--light-grey);
  border-radius: 36px;
  margin-bottom: 36px;
}
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
    padding: 9px;
    margin-bottom: 4.5px;
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

.resultsOptions {
  z-index: 1000;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding-top: 9px;
  background-color: rgba(white, 0.75);
  display: none;
}
.exportResultsBtn {
  position: relative;
  &:hover {
    & > .resultsOptions {
      display: block;
    }
  }
}
.addButton {
  text-decoration: none;
  color: black;
}
</style>
