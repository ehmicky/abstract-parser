import { getRemovedAttrs, removeAttrs } from './attributes.js'
import { sortKeys } from './sort.js'
import { traverse } from './traverse.js'

// Normalize AST node produced by parsers, according to options
export const normalizeNode = function (
  node,
  { top, locations, comments, parens, sort },
) {
  const nodeA = getTopNode(node, top)

  const removedAttrs = getRemovedAttrs({ locations, comments, parens })

  // Performance optimization since traversing is slow
  if (!sort && removedAttrs.length === 0) {
    return nodeA
  }

  return traverse(nodeA, normalize.bind(undefined, { removedAttrs, sort }))
}

// Unless the `top` option is used, we skip the top node
const getTopNode = function (node, top) {
  if (top) {
    return node
  }

  if (node.program !== undefined) {
    return node.program.body
  }

  return node.body
}

// Normalize each AST child node recursively
const normalize = function ({ removedAttrs, sort }, node) {
  const nodeA = removeAttrs(node, removedAttrs)
  const nodeB = sortKeys(nodeA, { sort })
  return nodeB
}
