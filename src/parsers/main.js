import { acorn } from './acorn/main.js'
import { babel, babelestree } from './babel/main.js'
import { espree } from './espree.js'
import { esprima } from './esprima.js'
import { meriyah } from './meriyah.js'
import { typescriptestree } from './typescript_estree.js'

export const PARSERS = [
  esprima,
  acorn,
  espree,
  meriyah,
  typescriptestree,
  babelestree,
  babel,
]
