import { normalizeTokens } from '../../tokens.js'

import { addPlugins } from './plugins.js'

// Parse JavaScript code with Acorn
const parse = function(
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

  const { allComments, allTokens, onceOpts } = getOnceState({
    comments,
    tokens,
  })

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
    ...(legacy ? {} : { ecmaVersion: 2020 }),
    allowHashBang: true,
    sourceFile: source,
    ...onceOpts,
  })

  return {
    ...node,
    ...addComments(allComments),
    ...normalizeTokens('onToken', allTokens),
  }
}

export const acorn = {
  id: 'acorn',
  title: 'Acorn',
  syntaxes: ['jsx'],
  parse,
}

// acorn requires passing mutable arrays to collect comments and tokens.
// This is done once per call.
const getOnceState = function({ comments, tokens }) {
  const allComments = comments ? [] : undefined
  const allTokens = tokens ? [] : undefined
  const onceOpts = getOnceOpts({ allComments, allTokens })
  return { allComments, allTokens, onceOpts }
}

const getOnceOpts = function({ allComments, allTokens }) {
  return {
    ...(allComments === undefined ? {} : { onComment: allComments }),
    ...(allTokens === undefined ? {} : { onToken: allTokens }),
  }
}

const addComments = function(allComments) {
  if (allComments === undefined) {
    return
  }

  return { onComment: allComments }
}
