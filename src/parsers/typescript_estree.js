import { parse as typescriptestreeParse } from '@typescript-eslint/typescript-estree'

// Parse JavaScript code with TypeScript-ESTree
const parse = function (code, { loose, locations, comments, tokens, jsx }) {
  try {
    return typescriptestreeParse(code, {
      errorOnUnknownASTType: loose,
      loc: locations,
      range: locations,
      comment: comments,
      jsx,
      useJSXTextNode: jsx,
      tokens,
    })
  } catch (error) {
    throw normalizeError(error)
  }
}

export const typescriptestree = {
  id: 'typescriptestree',
  title: 'TypeScript-ESTree',
  syntaxes: ['typescript', 'jsx'],
  parse,
}

// TypeScript-ESTree errors are not error instances
const normalizeError = function ({ message, lineNumber, column }) {
  return new Error(`${message} (${lineNumber}:${column})`)
}
