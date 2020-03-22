import { validate } from 'jest-validate'
import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = function (code, opts = {}) {
  validateBasic(code, opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const optsB = setForcedOpts({ opts: optsA })
  const optsC = addSourceType(optsB)
  return optsC
}

const validateBasic = function (code, opts) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

// This is exported so that `dev-parser` package can use it
export const DEFAULT_OPTS = {
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

export const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  source: 'filename.js',
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
