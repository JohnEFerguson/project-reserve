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

  a.href = URL.createObjectURL(
    new Blob([content], {
      type: mimeType,
    })
  )
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  // if (navigator.msSaveBlob) {
  //   // IE10
  //   navigator.msSaveBlob(
  //     new Blob([content], {
  //       type: mimeType,
  //     }),
  //     fileName
  //   )
  // } else if (URL && ('download' in a || a.download !== undefined)) {
  //   // html5 A[download]
  //   a.href = URL.createObjectURL(
  //     new Blob([content], {
  //       type: mimeType,
  //     })
  //   )
  //   a.setAttribute('download', fileName)
  //   document.body.appendChild(a)
  //   a.click()
  //   document.body.removeChild(a)
  // } else {
  //   location.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(content)
  // }
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
  priority.categoryCriteria.forEach((crit) => {
    const elements = []
    crit.elements.forEach((element) => {
      elements[element.order - 1] = element
    })
    criterias[crit.order - 1] = {
      ...deepClone(numericFields),
      ...crit,
      elements,
      criteriaType: CATEGORY_TYPE,
    }
  })
  priority.numericCriteria.forEach(
    (crit) =>
      (criterias[crit.order - 1] = {
        ...deepClone(categoryFields),
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

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
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

export function checkBinRange({ bins, min, max }) {
  let binError = null
  const rangeCovered = bins.forEach((bin, index) => {
    const isFirstBin = index === 0
    const isLastBin = index === bins.length - 1
    if (!isFloat(bin.min) || !isFloat(bin.max)) {
      binError = `Bin ${index + 1} must have a valid float.`
    } else if (bin.min < min) {
      binError = `Bin ${index + 1} cannot have a min less than ${min}.`
    } else if (bin.max > max) {
      binError = `Bin ${index + 1} cannot have a max greater than ${max}.`
    } else if (bin.min > bin.max) {
      binError = `Bin ${index + 1} cannot have a min greater than ${bin.max}.`
    } else if (bins.length > 1) {
      if (isFirstBin && bin.max !== bins[index + 1].min) {
        binError = `The max of Bin 1 should equal the min of Bin 2`
      } else if (index === bins.length - 1 && bin.min !== bins[index - 1].max) {
        binError = `The min of Bin ${
          index + 1
        } should equal the max of Bin ${index}`
      } else if (!isFirstBin && bin.min !== bins[index - 1].max) {
        binError = `The min of Bin ${
          index + 1
        } should equal the max of Bin ${index}`
      } else if (!isLastBin && bin.max !== bins[index + 1].min) {
        binError = `The max of Bin ${index + 1} should equal the min of Bin ${
          index + 2
        }`
      }
    }
  })
  return binError
}
