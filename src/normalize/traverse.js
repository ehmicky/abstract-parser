// Traverse an object and perform a `transform()` on each descendant
export const traverse = (object, transform) => {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (Array.isArray(object)) {
    return object.map((child) => traverse(child, transform))
  }

  const objectA = transform(object)

  const objectB = Object.keys(objectA)
    .map((key) => [key, traverse(objectA[key], transform)])
    .filter(isDefinedChild)
  const objectC = Object.fromEntries(objectB)
  return objectC
}

const isDefinedChild = ([, child]) => child !== undefined
