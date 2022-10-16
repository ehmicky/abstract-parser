import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = function (code, opts = {}) {
  validateBasic(code, opts)
  const optsA = normalizeBooleanOpts(opts)

  if (typeof optsA.source !== 'string') {
    throw new TypeError(`Option "source" must be a string: ${optsA.source}`)
  }

  const optsC = setForcedOpts({ opts: optsA })
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

const normalizeBooleanOpts = function (opts) {
  return BOOLEAN_OPTS.reduce(normalizeBooleanOpt, opts)
}

const BOOLEAN_OPTS = [
  'legacy',
  'script',
  'loose',
  'strict',
  'top',
  'sort',
  'locations',
  'comments',
  'tokens',
  'parens',
  'typescript',
  'flow',
  'jsx',
]

const normalizeBooleanOpt = function (opts, optName) {
  const { [optName]: optValue = false } = opts

  if (typeof optValue !== 'boolean') {
    throw new TypeError(`Option "${optName}" must be a boolean: ${optValue}`)
  }

  return { ...opts, [optName]: optValue }
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
