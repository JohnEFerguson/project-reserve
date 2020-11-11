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
    <div class="navButtons">
      <nuxt-link to="/finish" class="navButton">Back</nuxt-link>
      <nuxt-link
        to="/unit-definition"
        class="navButton"
        @click.native="initConfig"
        >Next</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import { unparse, parse } from 'papaparse'

const download = (
  content,
  fileName = 'csv_template',
  mimeType = 'text/csv;encoding:utf-8'
) => {
  const a = document.createElement('a')
  mimeType = mimeType || 'application/octet-stream'

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
  computed: {
    requiredFields() {
      return this.$store.state.currentConfig.requiredFields
    },
  },
  mounted() {
    this.$refs.fileUpload.addEventListener('change', () => {
      const file = this.$refs.fileUpload.files[0]
      if (file) {
        parse(file, {
          complete: async (res, file) => {
            // validate data
            const { data, errors } = res
            if (errors.length) {
              alert(errors[0])
            }
            const [fieldNames, ...patients] = data
            const dataTypeMap = this.requiredFields.reduce(
              (acc, { name, dataType }) => {
                const fieldIndex = fieldNames.indexOf(name)
                acc[fieldIndex] = { name, dataType }
                return acc
              },
              {}
            )
            let patientObjs
            try {
              patientObjs = patients.map((patient) => {
                patient.reduce((acc, field, index) => {
                  const { name, dataType } = dataTypeMap[index]
                  const errorMessage = `Patient ${index} has an invalid value for ${name}.`
                  let realFieldValue = field
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
              alert(e)
              return
            }

            console.log(patientObjs)

            // POST { name: file name }
            const sourceFileRes = await fetch('/api/sourceFile', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                name: file.name,
              }),
            })
            const sourceFile = await sourceFileRes.json()
            // return { name: file name, id: 1 }
            const patientsRes = await fetch('/api/patients', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(
                patientObjs.map((patientInfo) => ({
                  configId: this.$store.state.currentConfig.id,
                  sourceFileId: sourceFile.id,
                  ...patientInfo,
                }))
              ),
            })
            const patientList = patientsRes.json()
            console.log(patientList)
          },
        })
      }
    })
  },
  methods: {
    downloadCsvTemplate() {
      const csv = unparse({
        fields: this.requiredFields.map(({ name }) => name),
      })
      download(csv)
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
</style>
