export const CATEGORY_TYPE = 'categorical'
export const NUMERIC_TYPE = 'numeric'

export const categoryFields = {
  elements: [{ name: '', order: 1 }],
}
export const numericFields = {
  min: 0,
  max: 0,
  binOrder: 'desc',
  coarsened: true,
  numBins: 1,
  bins: [
    {
      min: 0,
      max: 0,
    },
  ],
}
