import { PARSERS } from './parsers/main.js'
import { getOpts } from './options.js'
import { normalizeNode } from './normalize/main.js'

// Retrieve an object with all parsers
const getParsers = function () {
  return Object.fromEntries(PARSERS.map(getParser))
}

const getParser = function ({ id, parse, ...parser }) {
  return [id, { id, ...parser, parse: parseCode.bind(null, parse) }]
}

// Main `parse()` function of each parser.
// We wrap the `parse()` function provided by the parser.
const parseCode = function (parse, code, opts) {
  const optsA = getOpts(code, opts)
  const node = parse(code, optsA)
  const nodeA = normalizeNode(node, optsA)
  return nodeA
}

const abstractParser = getParsers()

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = abstractParser
