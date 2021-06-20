import { normalizeTokens } from '../../tokens.js'

import { addPlugins } from './plugins.js'

// Parse JavaScript code with Acorn
const parse = function (
  code,
  {
    legacy,
    sourceType,
    loose,
    locations,
    comments,
    tokens,
    parens,
    source,
    jsx,
  },
) {
  const acornParser = addPlugins(legacy, jsx)

  const mutableOpts = getMutableOpts({ comments, tokens })
  const ecmaVersion = getEcmaVersion(legacy)

  const node = acornParser.parse(code, {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: loose,
    allowReserved: loose,
    locations,
    ranges: locations,
    preserveParens: parens,
    ecmaVersion,
    allowHashBang: true,
    sourceFile: source,
    ...mutableOpts,
  })

  const mutableOptsA = normalizeTokens(mutableOpts, 'onToken')
  return { ...node, ...mutableOptsA }
}

const getEcmaVersion = function (legacy) {
  if (legacy) {
    return EARLIEST_ECMA_VERSION
  }

  return LATEST_ECMA_VERSION
}

const EARLIEST_ECMA_VERSION = 3
const LATEST_ECMA_VERSION = 2022

export const acorn = {
  id: 'acorn',
  title: 'Acorn',
  syntaxes: ['jsx'],
  parse,
}

// acorn requires passing mutable arrays to collect comments and tokens.
const getMutableOpts = function ({ comments, tokens }) {
  return {
    ...(comments === undefined ? {} : { onComment: [] }),
    ...(tokens === undefined ? {} : { onToken: [] }),
  }
}
