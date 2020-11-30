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
        <label class="label status">Status</label>
        <label class="actionLabel">Action</label>
      </div>
      <div v-if="reserveInstances" class="reserveTableRows">
        <div
          v-for="instance in reserveInstances"
          :key="`${instance.id}`"
          class="reserveTableRow"
        >
          <span class="rowCell fw-b">{{ instance.dateLoaded }}</span>
          <span class="rowCell fw-b">{{ instance.name }}</span>
          <span class="rowCell status"
            ><span
              :class="[
                'statusText',
                {
                  inProgress: instance.status === 'IN_PROGRESS',
                  finished: instance.status === 'FINISHED',
                  error: instance.status === 'ERROR',
                  ready: instance.status === 'READY_TO_PROCESS',
                },
              ]"
              >{{ toTitleCase(instance.status) }}</span
            ></span
          >
          <div class="actionButtons">
            <button @click="() => startFromOldConfig(instance)">
              Start New Batch from Config
            </button>
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
          <router-link
            to="/unit-definition"
            class="addButton p-18 fs-12"
            @click.native="initConfig"
          >
            Add New Reserve Instance
          </router-link>
        </div>
      </div>
    </div>
    <div class="navButtons">
      <router-link to="/load-data" class="navButton">Back</router-link>
    </div>
  </div>
</template>

<script>
import path from 'path-browserify'
import { unparse } from 'papaparse'
import {
  transformCriteriaForDisplay,
  downloadCSV,
  removeIds,
} from '../plugins/helpers'
import ViewConfigModal from '../components/ViewConfigModal.vue'

export default {
  components: { ViewConfigModal },
  data() {
    return {
      viewConfigModalOpen: false,
      configToView: null,
    }
  },
  computed: {
    reserveInstances() {
      return (this.$store.state.reserveInstances || []).map((instance) => {
        const dateLoaded = new Date(instance.dateLoaded)
        return {
          ...instance,
          dateLoaded: `${dateLoaded.toLocaleDateString()} ${dateLoaded.toLocaleTimeString()}`,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('getReserveInstances')
  },
  serverPrefetch() {
    this.$store.dispatch('getReserveInstances')
  },
  methods: {
    initConfig() {
      this.$store.commit('resetConfig')
    },
    closeViewConfigModal() {
      this.viewConfigModalOpen = false
      this.configToView = null
    },
    toTitleCase(str) {
      return str.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    async fetchConfig(instance) {
      const configRes = await fetch(
        `/configurations/${instance.configurationId}`
      )
      const config = await configRes.json()
      return {
        ...config,
        reserveCategories: config.reserveCategories.reduce((acc, category) => {
          const formattedCategory = {
            ...category,
            priority: transformCriteriaForDisplay(category.priority),
          }
          acc.push(formattedCategory)
          return acc
        }, []),
      }
    },
    async startFromOldConfig(instance) {
      const config = await this.fetchConfig(instance)
      removeIds(config)
      this.$store.commit('setConfig', config)
      this.$nextTick(async () => {
        try {
          await this.$store.dispatch('postConfig')
          this.$router.push('/finish')
        } catch (e) {}
      })
    },
    async viewConfig(instance) {
      this.configToView = await this.fetchConfig(instance)
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
        `/configurations/${instance.configurationId}`
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
          ...patients
            .filter((patient) => !!patient.recipient_id)
            .map(Object.values),
        ]),
        fileName: `${parsedFileName}${suffix}`,
      })
    },
    async exportAll(instance) {
      const patientsRes = await fetch(`/sourceFiles/${instance.id}/patients`)
      const patients = await patientsRes.json()
      this.export({ instance, patients, suffix: '_all_patients' })
    },
    async exportWinners(instance) {
      const winnersRes = await fetch(
        `/sourceFiles/${instance.id}/patients?givenUnit=true`
      )
      const patients = await winnersRes.json()
      this.export({ instance, patients, suffix: '_recipients' })
    },
    async exportLosers(instance) {
      const losersRes = await fetch(
        `/sourceFiles/${instance.id}/patients?givenUnit=false`
      )
      const patients = await losersRes.json()
      this.export({ instance, patients, suffix: '_non_recipients' })
    },
  },
}
</script>

<style scoped lang="stylus">
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
  &.status {
    grid-column: span 2;
  }
}
.statusText {
  padding: 9px 18px;
  border-radius: 9px;
  text-transform: capitalize;
  &.finished {
    background-color: #00b456;
    color: white;
  }
  &.error {
    background-color: #ff4242;
    color: white;
  }
  &.inProgress {
    background-color: #ffa947;
  }
  &.ready {
    background-color: #63d4ff;
  }
}
.label {
  grid-column: span 3;
  &.status {
    grid-column: span 2;
  }
}
.actionLabel {
  grid-column: span 4;
}
.actionButtons {
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 9px;
  button {
    padding: 9px 4.5px;
    font-size: 12px;
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
  button {
    margin-bottom: 4.5px;
  }
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
  border: 1px solid black;
  background-color: var(--light-grey);
  text-decoration: none;
  color: black;
  border-radius: 2px;
  &:hover {
    background-color: var(--dark-grey);
  }
}
</style>
