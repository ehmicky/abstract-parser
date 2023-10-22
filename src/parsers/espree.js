import { parse as espreeParse } from 'espree'

// Parse JavaScript code with Espree
const parse = (
  code,
  { legacy, sourceType, loose, strict, locations, comments, tokens, jsx },
) =>
  espreeParse(code, {
    sourceType: legacy ? 'script' : sourceType,
    loc: locations,
    range: locations,
    comment: comments,
    ...(legacy ? {} : { ecmaVersion: 'latest' }),
    ecmaFeatures: {
      globalReturn: loose,
      impliedStrict: strict,
      jsx,
    },
    tokens,
  })

export const espree = {
  id: 'espree',
  title: 'Espree',
  syntaxes: ['jsx'],
  parse,
}
