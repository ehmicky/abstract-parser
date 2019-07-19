import { parse as espreeParse } from 'espree'

// Parse JavaScript code with Espree
const parse = function(
  code,
  { legacy, sourceType, loose, strict, locations, comments, tokens, jsx },
) {
  return espreeParse(code, {
    sourceType: legacy ? 'script' : sourceType,
    loc: locations,
    range: locations,
    comment: comments,
    ...(legacy ? {} : { ecmaVersion: 2019 }),
    ecmaFeatures: {
      globalReturn: loose,
      impliedStrict: strict,
      jsx,
    },
    tokens,
  })
}

export const espree = {
  id: 'espree',
  title: 'Espree',
  syntaxes: ['jsx'],
  parse,
}
