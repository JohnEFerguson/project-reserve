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
      <nuxt-link to="/finish" class="navButton">Back</nuxt-link>
      <nuxt-link
        :to="!successMessage ? '/load-data' : '/reserve-instances'"
        :class="['navButton', { isDisabled: !successMessage }]"
        @click.native="setReserveInstance"
        >Next</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { unparse, parse } from 'papaparse'

function download(content) {
  const a = document.createElement('a')
  const fileName = 'csv_template'
  const mimeType = 'text/csv;encoding:utf-8'

  if (navigator.msSaveBlob) {
    // IE10
    navigator.msSaveBlob(
      new Blob([content], {
        type: mimeType,
      }),
      fileName
    )
  } else if (URL && 'download' in a) {
    // html5 A[download]
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    )
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    location.href =
      'data:application/octet-stream,' + encodeURIComponent(content) // only this mime type is supported
  }
}

export default {
  middleware: 'has-category',
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      sourceFile: null,
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
    setReserveInstance() {
      this.$store.commit('addReserveInstance', {
        name: this.sourceFile.name,
        date: new Date(),
        status: 'unprocessed',
        configId: this.currentConfig.id,
      })
    },
    downloadCsvTemplate() {
      const csv = unparse({
        fields: this.requiredFields.map(({ name }) => name),
      })
      download(csv)
    },
    async parseUploadedCsv(res, file) {
      // validate data
      const { data, errors } = res
      if (errors.length) {
        alert(errors[0])
      }
      const [fieldNames, ...patients] = data
      let patientObjs
      try {
        const dataTypeMap = this.requiredFields.reduce(
          (acc, { name, dataType }) => {
            const fieldIndex = fieldNames.indexOf(name)
            if (fieldIndex < 0) {
              throw new Error(
                `Could not find column for ${name} in ${fieldNames.join(', ')}`
              )
            }
            acc[fieldIndex] = { name, dataType }
            return acc
          },
          {}
        )
        patientObjs = patients.map((patient) => {
          return patient.reduce((acc, field, index) => {
            const { name, dataType, required } = dataTypeMap[index]
            const errorMessage = `Patient ${index} has an invalid value for ${name}: ${field}.`
            let realFieldValue = field
            if (required && !realFieldValue) {
              throw new Error(
                `${errorMessage} This field is required but it empty.`
              )
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
                } catch {
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

      // POST { name: file name }
      const sourceFileRes = await fetch('/api/sourceFiles', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          configurationId: this.currentConfig.id,
          name: file.name,
        }),
      })
      const sourceFile = await sourceFileRes.json()
      await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          patientObjs.map((patientInfo) => ({
            configurationId: this.currentConfig.id,
            sourceFileId: sourceFile.id,
            ...patientInfo,
          }))
        ),
      })
      this.errorMessage = null
      this.sourceFile = sourceFile
      this.successMessage = `Successfully loaded ${sourceFile.name}`
    },
  },
}
</script>

<style scoped lang="scss">
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
