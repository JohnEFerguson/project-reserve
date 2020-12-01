<template>
  <div class="container">
    <h1 class="header">Load Data</h1>
    <div class="flexrow p18 loadBtnWrapper">
      <span>Please upload a CSV file</span>
      <button class="navButton ml-a fs-16" @click="downloadCsvTemplate">
        Download Template
      </button>
      <input
        id="fileUpload"
        ref="fileUpload"
        type="file"
        style="display: none"
        accept=".csv"
      />
      <label class="navButton ml-18 fs-16" for="fileUpload">Upload</label>
    </div>
    <div
      v-if="errorMessage || successMessage"
      :class="['pageMessageWrapper', { isError: errorMessage }]"
    >
      <div class="pageMessage">
        {{ errorMessage || successMessage }}
      </div>
    </div>
    <div class="navButtons">
      <router-link to="/finish" class="navButton">Back</router-link>
      <router-link
        :to="!successMessage ? '/load-data' : '/reserve-instances'"
        :class="['navButton', { isDisabled: !successMessage }]"
        @click.native="setReserveInstance"
        >Next</router-link
      >
    </div>
  </div>
</template>

<script>
import { unparse, parse } from 'papaparse'
import { downloadCSV } from '../plugins/helpers'

export default {
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      sourceFile: null,
      patientObjs: null,
    }
  },
  computed: {
    requiredFields() {
      return this.$store.state.currentConfig.requiredFields
    },
    currentConfig() {
      return this.$store.state.currentConfig
    },
  },
  mounted() {
    this.$refs.fileUpload.addEventListener('change', () => {
      const file = this.$refs.fileUpload.files[0]
      if (file) {
        parse(file, {
          complete: (res, file) => {
            this.parseUploadedCsv(res, file)
          },
        })
      }
    })
  },
  methods: {
    async setReserveInstance() {
      if (this.successMessage) {
        const sourceFileRes = await fetch('/sourceFiles', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            configurationId: this.currentConfig.id,
            name: this.sourceFile.name,
          }),
        })
        const sourceFile = await sourceFileRes.json()

        // const CHUNK_UPPER_LIMIT = 50
        // let numChunks = 1
        // const patientChunks = this.patientObjs.reduce(
        //   (chunks, patientObj) => {
        //     if (chunks[numChunks - 1].length === CHUNK_UPPER_LIMIT) {
        //       numChunks = numChunks + 1
        //       chunks.push([])
        //     }
        //     chunks[numChunks - 1].push(patientObj)
        //     return chunks
        //   },
        //   [[]]
        // )
        // await Promise.all(
        //   patientChunks.map((chunk) =>
        //     fetch('/patients', {
        //       method: 'POST',
        //       headers: {
        //         'content-type': 'application/json',
        //       },
        //       body: JSON.stringify(
        //         chunk.map((patientInfo) => ({
        //           configurationId: this.currentConfig.id,
        //           sourceFileId: sourceFile.id,
        //           ...patientInfo,
        //         }))
        //       ),
        //     })
        //   )
        // )

        await fetch('/patients', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(
            this.patientObjs.map((patientInfo) => ({
              configurationId: this.currentConfig.id,
              sourceFileId: sourceFile.id,
              ...patientInfo,
            }))
          ),
        })
        this.$store.dispatch('processSourceFile', sourceFile.id)
      }
    },
    downloadCsvTemplate() {
      const csv = unparse({
        fields: this.requiredFields.map(({ name }) => name),
      })
      downloadCSV({
        content: csv,
        fileName: `${new Date().toLocaleDateString()}_${
          this.currentConfig.unitType
        }_${this.currentConfig.supply}`,
      })
    },
    async parseUploadedCsv(res, file) {
      // validate data
      const { data, errors } = res
      if (errors.length) {
        this.errorMessage = errors
      }
      const [fieldNames, ...patients] = data
      let patientObjs
      try {
        const dataTypeMap = this.requiredFields.reduce(
          (acc, { name, dataType, required }) => {
            const fieldIndex = fieldNames.indexOf(name)
            if (fieldIndex < 0) {
              throw new Error(
                `Could not find column for required field ${name} in ${fieldNames.join(
                  ', '
                )}`
              )
            }
            acc[fieldIndex] = { name, dataType, required }
            return acc
          },
          {}
        )
        const recipientIds = []
        patientObjs = patients.map((patient) => {
          return patient.reduce((acc, field, index) => {
            const { name, dataType, required } = dataTypeMap[index] || {
              name: fieldNames[index],
              dataType: 'STRING',
              required: false,
            }
            const errorMessage = `Patient ${index} has an invalid value for ${name}: ${field}.`
            let realFieldValue = field
            if (required && !realFieldValue) {
              throw new Error(
                `${errorMessage} This field is required but is empty.`
              )
            }
            if (name === 'recipient_id') {
              if (recipientIds.includes(realFieldValue)) {
                throw new Error(
                  `${errorMessage} Duplicate recipient ID: ${realFieldValue}`
                )
              } else {
                recipientIds.push(realFieldValue)
              }
            }

            switch (dataType) {
              case 'BOOLEAN': {
                const fieldUC = field.toUpperCase()
                if (!['TRUE', 'FALSE'].includes(fieldUC)) {
                  throw new Error(
                    `${errorMessage} Please ensure this is a true/false value`
                  )
                }
                realFieldValue = fieldUC === 'TRUE'
                break
              }
              case 'NUMBER': {
                let numberVal
                try {
                  numberVal = parseFloat(field)
                } catch (_) {
                  throw new Error(
                    `${errorMessage} Please ensure this is a real number`
                  )
                }
                realFieldValue = numberVal
                break
              }
              default:
              case 'STRING':
                // data will always be a string?
                break
            }
            acc[name] = realFieldValue
            return acc
          }, {})
        })
      } catch (e) {
        this.errorMessage = e
        this.$refs.fileUpload.value = ''
        return
      }
      this.errorMessage = null
      this.sourceFile = file
      this.patientObjs = patientObjs
      this.successMessage = `Successfully loaded ${file.name}`
    },
  },
}
</script>

<style scoped lang="stylus">
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 45px;
}
.header {
  padding: 18px 45px;
  color: var(--dark-blue);
  background-color: var(--light-grey);
  border-radius: 36px;
}
.navButtons {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.loadBtnWrapper {
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
  width: 50%;
}
.pageMessageWrapper {
  width: 50%;
  padding: 18px 27px;
  border-radius: 18px;
  border: 2px solid green;
  background-color: rgba(green, 0.1);
  color: green;
  &.isError {
    border: 2px solid red;
    color: red;
    background-color: rgba(red, 0.1);
  }
}
</style>
