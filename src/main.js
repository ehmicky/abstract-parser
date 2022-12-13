import { normalizeNode } from './normalize/main.js'
import { getOpts } from './options.js'
import {
  acorn as acornParser,
  babel as babelParser,
  babelEstree as babelEstreeParser,
  espree as espreeParser,
  esprima as esprimaParser,
  meriyah as meriyahParser,
  typescriptEstree as typescriptEstreeParser,
} from './parsers/main.js'

const getParser = (parser) => ({
  ...parser,
  parse: parseCode.bind(undefined, parser.parse),
})

// Main `parse()` function of each parser.
// We wrap the `parse()` function provided by the parser.
const parseCode = (parse, code, opts) => {
  const optsA = getOpts(code, opts)
  const node = parse(code, optsA)
  const nodeA = normalizeNode(node, optsA)
  return nodeA
}

export const acorn = getParser(acornParser)
export const babel = getParser(babelParser)
export const babelEstree = getParser(babelEstreeParser)
export const espree = getParser(espreeParser)
export const esprima = getParser(esprimaParser)
export const meriyah = getParser(meriyahParser)
export const typescriptEstree = getParser(typescriptEstreeParser)
