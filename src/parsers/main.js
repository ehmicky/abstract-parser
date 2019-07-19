import { esprima } from './esprima.js'
import { acorn } from './acorn/main.js'
import { espree } from './espree.js'
import { typescriptEstree } from './typescript_estree.js'
import { meriyah } from './meriyah.js'
import { babel, babelEstree } from './babel/main.js'

export const PARSERS = [
  esprima,
  acorn,
  espree,
  meriyah,
  typescriptEstree,
  babelEstree,
  babel,
]
