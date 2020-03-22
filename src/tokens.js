// Normalize tokens format used by Babel and Acorn to make it closer to
// format used by Espree, Esprima, Meriyah and TypeScript-ESTree
export const normalizeTokens = function (node, name) {
  if (node[name] === undefined) {
    return node
  }

  const tokens = node[name].map(normalizeToken)
  return { ...node, [name]: tokens }
}

const normalizeToken = function ({ type, value }) {
  const { type: typeA, token } = parseTokenType(type)

  if (value === undefined) {
    return { type: typeA, ...token }
  }

  return { type: typeA, value, ...token }
}

// `token.type` is a string for comments with Babel
const parseTokenType = function (type) {
  if (typeof type === 'string') {
    return { type, token: {} }
  }

  const { label: typeA, ...token } = type
  return { type: typeA, token }
}
