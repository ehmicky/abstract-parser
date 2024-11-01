import { LOCATION_ATTRS } from './attributes.js'

// If the `sort` option is `true`, we sort AST node attributes
export const sortKeys = (node, { sort }) => {
  if (!sort) {
    return node
  }

  return sortObject(node, keysComparator)
}

const sortObject = (object, comparator) => {
  // eslint-disable-next-line fp/no-mutating-methods
  const keys = Object.keys(object).sort(comparator)
  return Object.fromEntries(keys.map((key) => [key, object[key]]))
}

const keysComparator = (keyA, keyB) => {
  // `type` always come first
  if (keyA === 'type') {
    return -1
  }

  if (keyB === 'type') {
    return 1
  }

  return sortLocAttr(keyA, keyB)
}

// Location attributes come last, and follow a specific order with each other
const sortLocAttr = (keyA, keyB) => {
  const [locIndexA, locIndexB] = getLocIndexes(keyA, keyB)

  if (locIndexA === -1) {
    return -1
  }

  if (locIndexB === -1) {
    return 1
  }

  return compareKeys(locIndexA, locIndexB)
}

const getLocIndexes = (keyA, keyB) => {
  const locIndexA = LOCATION_ATTRS.indexOf(keyA)
  const locIndexB = LOCATION_ATTRS.indexOf(keyB)

  if (locIndexA === -1 && locIndexB === -1) {
    return []
  }

  return [locIndexA, locIndexB]
}

const compareKeys = (keyA, keyB) => (keyA > keyB ? 1 : -1)
