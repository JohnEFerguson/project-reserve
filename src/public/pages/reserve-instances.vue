<template>
  <div class="reserveContainer">
    <h1 class="header">Project Reserve</h1>
    <CopyModal
      v-if="copyToShow"
      :copy="copyToShow"
      :on-close="closeCopyModal"
    />
    <ViewConfigModal
      v-if="viewConfigModalOpen"
      :on-close="closeViewConfigModal"
      :config="configToView"
    />
    <ConfirmationModal
      v-if="confirmationModalOpen"
      :on-close="handleConfirmationClose"
      :action="confirmationAction"
    />
    <h2 class="tableLabel mb-9 fs-16 fw-n">
      Database of reserve instances<font-awesome-icon
        icon="info-circle"
        class="icon ml-9"
        @click="openCopyModal"
      />
    </h2>
    <div class="reserveTableContainer">
      <div class="reserveTableLabels">
        <font-awesome-icon
          v-if="reserveInstances.length"
          icon="trash"
          size="sm"
          class="deleteReserveInstanceButton icon"
          @click="openDeleteAllConfirm"
        />
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
          <font-awesome-icon
            icon="trash"
            size="sm"
            class="deleteReserveInstanceButton icon"
            @click="() => openDeleteConfirm(instance)"
          />
          <span class="rowCell fw-b">{{ instance.dateLoaded }}</span>
          <span class="rowCell fw-b">{{ instance.name }}</span>
          <span class="rowCell status"
            ><button
              @click="() => processSourceFile(instance)"
              :class="[
                'statusText',
                {
                  inProgress: instance.status === 'IN_PROGRESS',
                  finished: instance.status === 'FINISHED',
                  error: instance.status === 'ERROR',
                  ready: instance.status === 'READY_TO_PROCESS',
                },
              ]"
            >
              {{ toTitleCase(instance.status) }}
            </button></span
          >
          <div class="actionButtons">
            <button @click="() => startFromOldConfig(instance)">
              Start New Batch from Config
            </button>
            <button @click="() => viewConfig(instance)">
              View Configuration
            </button>
            <div class="exportResultsButtonWrapper">
              <button class="exportResultsBtn">Export Results ▼</button>
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
            </div>
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
      <router-link to="/" class="navButton">Back</router-link>
    </div>
  </div>
</template>

<script>
import path from 'path-browserify'
import pick from 'lodash.pick'
import { unparse } from 'papaparse'
import {
  transformCriteriaForDisplay,
  downloadCSV,
  removeIds,
  toTitleCase,
  deepClone,
} from '../plugins/helpers'
import ViewConfigModal from '../components/ViewConfigModal.vue'
import ConfirmationModal from '../components/ConfirmationModal.vue'
import CopyModal from '../components/CopyModal.vue'
import {
  reserveInstancesCopy,
  categoryFields,
  numericFields,
  CATEGORY_TYPE,
} from '../components/constants'

export default {
  components: { ViewConfigModal, ConfirmationModal, CopyModal },
  data() {
    return {
      viewConfigModalOpen: false,
      configToView: null,
      confirmationModalOpen: false,
      handleConfirmationClose: null,
      confirmationAction: null,
      copyToShow: null,
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
    openCopyModal() {
      this.copyToShow = reserveInstancesCopy
    },
    closeCopyModal() {
      this.copyToShow = null
    },
    toTitleCase(str) {
      return toTitleCase(str)
    },
    initConfig() {
      this.$store.commit('resetConfig')
    },
    closeViewConfigModal() {
      this.viewConfigModalOpen = false
      this.configToView = null
    },
    processSourceFile(instance) {
      if (instance.status !== 'FINISHED') {
        this.$store.dispatch('processSourceFile', instance)
      }
    },
    openDeleteConfirm(instance) {
      this.confirmationAction = 'Delete this reserve instance?'
      this.handleConfirmationClose = (shouldDelete) => {
        if (shouldDelete) {
          this.$store.dispatch('deleteReserveInstance', instance.id)
        }
        this.confirmationModalOpen = false
        this.confirmationAction = null
        this.handleConfirmationClose = null
      }
      this.confirmationModalOpen = true
    },
    openDeleteAllConfirm() {
      this.confirmationAction = 'Delete all reserve instances?'
      this.handleConfirmationClose = (shouldDelete) => {
        if (shouldDelete) {
          this.$store.dispatch('deleteAllReserveInstances')
        }
        this.confirmationModalOpen = false
        this.confirmationAction = null
        this.handleConfirmationClose = null
      }
      this.confirmationModalOpen = true
    },
    transformConfigForDisplay(config) {
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
    async fetchConfig(instance) {
      const configRes = await fetch(
        `/configurations/${instance.configurationId}`
      )
      const config = await configRes.json()
      return this.transformConfigForDisplay(config)
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
    generatePriorityString(priority) {
      const filteredPriority = pick(priority, [
        'name',
        ...Object.keys(
          priority.criteriaType === CATEGORY_TYPE
            ? categoryFields
            : numericFields
        ),
      ])
      const priorityStringElements = []
      Object.keys(filteredPriority).forEach((key) => {
        switch (key) {
          case 'elements':
            priorityStringElements.push(
              `elements (n = ${
                filteredPriority.elements.length
              }) = {${filteredPriority.elements
                .map(({ name }) => name)
                .join(', ')}}`
            )
            break
          case 'ascending':
            priorityStringElements.push(
              `direction = ${
                filteredPriority.ascending
                  ? 'lowest value prioritized'
                  : 'highest value prioritized'
              }`
            )
            break
          case 'bins':
            priorityStringElements.push(
              `number_of_bins = ${filteredPriority.bins.length}`
            )
            break
          case 'numBins':
            break
          default:
            priorityStringElements.push(`${key} = ${filteredPriority[key]}`)
            break
        }
      })
      return priorityStringElements.join(', ')
    },
    async export({ instance, patients, suffix }) {
      const configurationRes = await fetch(
        `/configurations/${instance.configurationId}`
      )
      const configuration = await configurationRes.json()
      const nthReservePatientsRes = await fetch(
        `/sourceFiles/${instance.id}/nthReservePatients`
      )
      const nthReservePatients = await nthReservePatientsRes.json()
      const leftOverRes = await fetch(`/sourceFiles/${instance.id}/leftOver`)
      const leftOver = await leftOverRes.json()

      const parsedFileName = path.parse(instance.name).name
      const today = new Date()
      const loaded = new Date(instance.dateLoaded)
      const displayConfig = this.transformConfigForDisplay(configuration)
      const outputArray = []
      outputArray.push([
        `${today.toLocaleDateString()} ${today.toLocaleTimeString()} Export from Project Reserve | Allocation of ${
          displayConfig.unitType
        } using ${parsedFileName}`,
      ])
      outputArray.push([])
      outputArray.push([`Unit Allocated: ${displayConfig.unitType}`])
      outputArray.push([`Number Allocated: ${displayConfig.supply}`])
      outputArray.push([`Units Left Over: ${leftOver}`])
      outputArray.push([
        [
          `Allocation Timestamp: ${loaded.toLocaleDateString()} ${loaded.toLocaleTimeString()}`,
        ],
      ])
      outputArray.push([])
      outputArray.push(['Reserve Categories'])
      outputArray.push([[]])

      displayConfig.reserveCategories.forEach((category, index) => {
        const nthPatient =
          nthReservePatients &&
          nthReservePatients.find((patient) => patient.name === category.name)
        outputArray.push([
          '',
          `(${index + 1}) ${category.name} (size = ${category.size}${
            nthPatient
              ? `, nth recipient id = ${nthPatient.nthRecipientId}`
              : ''
          })`,
        ])
        category.priority.forEach((priority, index) => {
          outputArray.push([
            '',
            '',
            `Criteria ${index + 1}: ${priority.name} (type = ${
              priority.criteriaType
            }, ${this.generatePriorityString(priority)})`,
          ])
        })
        outputArray.push([
          '',
          '',
          'Final criteria is always a unique random lottery number',
        ])
      })
      outputArray.push([])
      outputArray.push([])
      outputArray.push([])
      if (patients.length) {
        outputArray.push(Object.keys(patients[0]))
      } else {
        outputArray.push(['No patients to display'])
      }
      patients.forEach((patient) => {
        if (patient.recipient_id) {
          outputArray.push(Object.values(patient))
        }
      })

      downloadCSV({
        content: unparse(outputArray),
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
  margin-top: 36px;
}
.reserveContainer {
  height: fit-content;
  padding-bottom: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: auto;
}
.reserveTableContainer {
  max-height: 65%;
  width: 90%;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
}
.reserveTableLabels {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 18px;
  padding: 18px;
  border-bottom: 2px solid var(--dark-blue);
  text-align: center;
  position: relative;
}
.reserveTableRows {
  background: var(--light-grey);
  border-radius: 0 0 18px 18px;
  overflow: visible;
}
.reserveTableRow {
  display: grid;
  padding: 18px;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 18px;
  border-radius: 18px;
  text-align: center;
  position: relative;
}
.deleteReserveInstanceButton {
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate3d(-50%, -50%, 0);
  z-index: 10;
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
  &:focus {
    outline: none;
  }
  &.finished {
    background-color: #00b456;
    color: white;
    cursor: default;
  }
  &.error {
    background-color: #ff4242;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: .75;
    }
  }
  &.inProgress {
    background-color: #ffa947;
  }
  &.ready {
    background-color: #63d4ff;
    cursor: pointer;
    &:hover {
      opacity: .75;
    }
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
.exportResultsButtonWrapper {
  position: relative;
  &:hover {
    & > .resultsOptions {
      display: block;
    }
  }
}
.exportResultsBtn {
  height: 100%;
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
