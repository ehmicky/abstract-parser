import { parse as babelParse } from '@babel/parser'

import { normalizeTokens } from '../../tokens.js'

import { getPlugins } from './plugins.js'

// Parse JavaScript code with @babel/parser
const parse = (
  plugins,
  code,
  {
    legacy,
    sourceType,
    loose,
    strict,
    locations,
    comments,
    tokens,
    source,
    typescript,
    flow,
    jsx,
  },
) => {
  const pluginsA = getPlugins({ plugins, typescript, flow, jsx, legacy })

  const node = babelParse(code, {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowNewTargetOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowSuperOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: loose,
    annexB: loose,
    strictMode: strict,
    plugins: pluginsA,
    attachComment: comments,
    ranges: locations,
    tokens,
    sourceFilename: source,
  })

  const nodeA = normalizeTokens(node, 'tokens')
  return nodeA
}

// @babel/parser without `estree` plugin
export const babel = {
  id: 'babel',
  title: 'Babel',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(undefined, []),
}

// @babel/parser with `estree` plugin
export const babelEstree = {
  id: 'babelEstree',
  title: 'Babel-ESTree',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(undefined, ['estree']),
}
