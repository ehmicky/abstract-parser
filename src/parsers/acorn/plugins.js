import { parse, Parser } from 'acorn'
import acornJsx from 'acorn-jsx'
import acornStage3 from 'acorn-stage3'
import moize from 'moize'

// Add acorn plugins according to options
const mAddPlugins = function (legacy, jsx) {
  const plugins = [
    ...(legacy ? [] : [acornStage3]),
    ...(jsx ? [acornJsx()] : []),
  ]
  return plugins.length === 0 ? parse : Parser.extend(...plugins)
}

export const addPlugins = moize(mAddPlugins, { maxSize: 1e3 })
