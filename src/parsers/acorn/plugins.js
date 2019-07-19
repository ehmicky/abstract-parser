// eslint-disable-next-line import/no-namespace
import * as acornMain from 'acorn'
import acornStage3 from 'acorn-stage3'
import acornJsx from 'acorn-jsx'
import moize from 'moize'

// Add acorn plugins according to options
const mAddPlugins = function(legacy, jsx) {
  const plugins = [
    ...(legacy ? [] : [acornStage3]),
    ...(jsx ? [acornJsx()] : []),
  ]

  if (plugins.length === 0) {
    return acornMain
  }

  return acornMain.Parser.extend(...plugins)
}

export const addPlugins = moize(mAddPlugins)
