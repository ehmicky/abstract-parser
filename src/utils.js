// Is a plain object, including `Object.create(null)`
export const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    // istanbul ignore next
    (val.constructor === Object || val.constructor === undefined)
  )
}
