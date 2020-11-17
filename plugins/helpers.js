export function downloadCSV({ content, fileName }) {
  const a = document.createElement('a')
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
