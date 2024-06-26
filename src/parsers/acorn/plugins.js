import { parse, Parser } from 'acorn'
import acornJsx from 'acorn-jsx'
import acornStage3 from 'acorn-stage3'
import memoize from 'memoize'

// Add acorn plugins according to options
const mAddPlugins = (legacy, jsx) => {
  const plugins = [
    ...(legacy ? [] : [acornStage3]),
    ...(jsx ? [acornJsx()] : []),
  ]
  return plugins.length === 0 ? parse : Parser.extend(...plugins)
}

export const addPlugins = memoize(mAddPlugins, { cacheKey: String })
