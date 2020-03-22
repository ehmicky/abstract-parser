import { parse as meriyahParse } from 'meriyah'

// Parse JavaScript code with Meriyah
const parse = function (
  code,
  {
    legacy,
    sourceType,
    loose,
    strict,
    locations,
    comments,
    parens,
    source,
    jsx,
  },
) {
  // meriyah requires passing mutable arrays to collect comments.
  const mutableOpts = comments === undefined ? {} : { onComment: [] }

  const node = meriyahParse(code, {
    module: sourceType === 'module',
    globalReturn: loose,
    specDeviation: loose,
    impliedStrict: strict,
    loc: locations,
    ranges: locations,
    preserveParens: parens,
    raw: true,
    directives: true,
    next: !legacy,
    jsx,
    source,
    ...mutableOpts,
  })

  return { ...node, ...mutableOpts }
}

export const meriyah = {
  id: 'meriyah',
  title: 'Meriyah',
  syntaxes: ['jsx'],
  parse,
}
