import { parse as meriyahParse } from 'meriyah'

// Parse JavaScript code with Meriyah
const parse = function(
  code,
  { legacy, sourceType, loose, strict, locations, parens, source, jsx },
) {
  return meriyahParse(code, {
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
  })
}

export const meriyah = {
  id: 'meriyah',
  title: 'Meriyah',
  syntaxes: ['jsx'],
  parse,
}
