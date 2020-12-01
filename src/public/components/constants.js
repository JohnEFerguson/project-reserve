export const CATEGORY_TYPE = 'categorical'
export const NUMERIC_TYPE = 'numeric'

export const categoryFields = {
  elements: [{ name: '', order: 1 }],
}
export const numericFields = {
  min: 0,
  max: 0,
  ascending: true,
  coarsened: false,
  numBins: 1,
  bins: [
    {
      order: 1,
      min: 0,
      max: 0,
    },
  ],
}

export const unitDefinitionCopyMap = {
  unitType: {
    title: 'What is the unit allocated?',
    definition:
      'The <span style="text-decoration: underline;">unit allocated</span> is the name of the good or service that is being rationed. Examples include monoclonal antibodies, vaccine doses, or supply of remdesivir. It is recommended, but not required, that this is a one word term (e.g. antibodies).',
  },
  unitAllocation: {
    title: 'What is the number of units allocated?',
    definition:
      'The <span style="text-decoration: underline;">number of units allocated</span> is the amount of total supply rationed in the particular allocation instance. For example, if this application is being used to give out 50 vaccine doses to a subset of 500 people, the number of units allocated is 50.',
    faqs: [
      {
        question:
          'Will I be able to change the number of units allocated later?',
        answer:
          'Yes. On a separate page, there is functionality to load a previous configuration in which case this number of units allocated will likely need to be adjusted for the new instance.',
      },
      {
        question: 'Are there any constraints on this?',
        answer:
          'Yes, but they are small. The number of units needs to be greater than 0 and a whole number.',
      },
    ],
  },
}

export const editReserveCategoryCopyMap = null
