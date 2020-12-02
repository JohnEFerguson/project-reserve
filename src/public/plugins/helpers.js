import pick from 'lodash.pick'
import {
  categoryFields,
  numericFields,
  CATEGORY_TYPE,
  NUMERIC_TYPE,
} from '../components/constants'

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

// function generateBins({ min, max }) {
//   const diff = max - min
//   const bins = []
//   for (let i = 0; i < diff; i++) {
//     bins.push({
//       order: i + 1,
//       min: min + i,
//       max: min + 1 + i,
//     })
//   }
//   return bins
// }

export function transformCriteriaForPost(priority) {
  if (!priority) {
    return null
  }
  const categoryCriteria = []
  const numericCriteria = []

  const priorityMap = {
    [CATEGORY_TYPE]: {
      bucket: categoryCriteria,
      fields: categoryFields,
    },
    [NUMERIC_TYPE]: {
      bucket: numericCriteria,
      fields: numericFields,
    },
  }
  let order = 1
  priority.forEach((criteria) => {
    const { bucket, fields } = priorityMap[criteria.criteriaType]
    if (criteria.name) {
      const filteredCriteria = {
        order,
        ...pick(criteria, ['name', ...Object.keys(fields)]),
      }
      if (criteria.criteriaType === CATEGORY_TYPE) {
        filteredCriteria.elements = filteredCriteria.elements.filter(
          ({ name }) => !!name
        )
      } else {
        const totalBins = filteredCriteria.bins.length
        for (let i = 0; i < totalBins; i++) {
          filteredCriteria.bins[i].order = filteredCriteria.ascending
            ? i + 1
            : totalBins - i
        }
      }
      bucket.push(filteredCriteria)
      order = order + 1
    }
  })
  return {
    categoryCriteria,
    numericCriteria,
  }
}

export function transformCriteriaForDisplay(priority) {
  if (!priority) {
    return null
  }
  const criterias = []
  priority.categoryCriteria.forEach(
    (crit) =>
      (criterias[crit.order - 1] = {
        ...crit,
        criteriaType: CATEGORY_TYPE,
      })
  )
  priority.numericCriteria.forEach(
    (crit) =>
      (criterias[crit.order - 1] = {
        ...crit,
        numBins: crit.bins.length,
        criteriaType: NUMERIC_TYPE,
      })
  )
  return criterias
}

export function removeIds(obj) {
  for (const prop in obj) {
    if (
      [
        'id',
        'configurationId',
        'sourceFileId',
        'reserveCategoryId',
        'priorityId',
      ].includes(prop)
    )
      delete obj[prop]
    else if (typeof obj[prop] === 'object') removeIds(obj[prop])
  }
}

export function isFloat(val) {
  var floatRegex = /^-?\d+(?:[.,]\d*?)?$/
  if (!floatRegex.test(val)) return false

  val = parseFloat(val)
  if (isNaN(val)) return false
  return true
}

export function toTitleCase(str) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
