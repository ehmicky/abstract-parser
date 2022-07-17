import { excludeKeys } from 'filter-obj'
import isPlainObj from 'is-plain-obj'
import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (code, opts = {}) {
  validateBasic(code, opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = excludeKeys(opts, isUndefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }

  const optsC = setForcedOpts({ opts: optsB })
  const optsD = addSourceType(optsC)
  return optsD
}

const validateBasic = function (code, opts) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const DEFAULT_OPTS = {
  legacy: false,
  script: false,
  loose: false,
  strict: false,
  top: false,
  sort: false,
  locations: false,
  comments: false,
  tokens: false,
  parens: false,
  typescript: false,
  flow: false,
  jsx: false,
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  source: 'filename.js',
}

const isUndefined = function (key, value) {
  return value === undefined
}

const setForcedOpts = function ({
  opts,
  opts: { flow, typescript, top, comments, tokens },
}) {
  return {
    ...opts,
    // Flow is incompatible with TypeScript
    flow: flow && !typescript,
    // Comments and tokens are usually set on the top-level, so they require
    // the `top` option to be `true`
    top: top || comments || tokens,
  }
}

const addSourceType = function ({ script, ...opts }) {
  const sourceType = script ? 'script' : 'module'
  return { ...opts, sourceType }
}
