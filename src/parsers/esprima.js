import { parse as esprimaParse } from 'esprima'

// Parse JavaScript code with Esprima
const parse = (code, { sourceType, loose, locations, comments, tokens, jsx }) =>
  esprimaParse(code, {
    sourceType,
    tolerant: loose,
    loc: locations,
    range: locations,
    comment: comments,
    jsx,
    tokens,
  })

export const esprima = {
  id: 'esprima',
  title: 'Esprima',
  syntaxes: ['jsx'],
  parse,
}
