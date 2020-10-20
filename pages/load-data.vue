<template>
  <div class="container">
    <h1 class="header">Load Data</h1>
    <div class="flexrow p18 loadBtnWrapper">
      <span>Please upload a CSV file</span>
      <button class="navButton ml-a fs-16" @click="downloadCsvTemplate">
        Download Template
      </button>
      <button class="navButton ml-18 fs-16">Upload</button>
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
import { unparse } from 'papaparse'

const download = (content, fileName, mimeType) => {
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
  methods: {
    downloadCsvTemplate() {
      const csv = unparse({
        fields: this.$store.state.currentConfig.requiredFields.map(
          ({ name }) => name
        ),
      })
      download(csv, 'csv_template', 'text/csv;encoding:utf-8')
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
