import { parse as typescriptEstreeParse } from '@typescript-eslint/typescript-estree'

// Parse JavaScript code with TypeScript-ESTree
const parse = (code, { loose, locations, comments, tokens, source, jsx }) => {
  try {
    return typescriptEstreeParse(code, {
      allowInvalidAST: loose,
      loc: locations,
      range: locations,
      comment: comments,
      tokens,
      jsx,
      filePath: source,
    })
  } catch (error) {
    throw normalizeError(error)
  }
}

export const typescriptEstree = {
  id: 'typescriptEstree',
  title: 'TypeScript-ESTree',
  syntaxes: ['typescript', 'jsx'],
  parse,
}

// TypeScript-ESTree errors are not error instances
const normalizeError = ({ message, lineNumber, column }) =>
  new Error(`${message} (${lineNumber}:${column})`)
