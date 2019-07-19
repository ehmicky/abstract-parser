// Normalize tokens format used by Babel and Acorn to make it closer to
// format used by Espree, Esprima, Meriyah and TypeScript-ESTree
export const normalizeTokens = function(name, allTokens) {
  if (allTokens === undefined) {
    return
  }

  const allTokensA = allTokens.map(normalizeToken)
  return { [name]: allTokensA }
}

const normalizeToken = function({ type: { label: type, ...token }, value }) {
  if (value === undefined) {
    return { type, ...token }
  }

  return { type, value, ...token }
}
