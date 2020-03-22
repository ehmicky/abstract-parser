// Retrieve list of Babel plugins according to options
export const getPlugins = function ({
  plugins,
  typescript,
  flow,
  jsx,
  legacy,
}) {
  return [
    { names: plugins, enabled: true },
    { names: ['typescript'], enabled: typescript },
    { names: ['flow', 'flowComments'], enabled: flow },
    { names: ['jsx'], enabled: jsx },
    { names: SYNTAX_PLUGINS, enabled: !legacy },
  ]
    .filter(isPluginEnabled)
    .flatMap(getPluginsNames)
}

// All `babel-syntax-*`
const SYNTAX_PLUGINS = [
  // Always included:
  // 'asyncGenerators',
  // 'objectRestSpread',
  // 'optionalCatchBinding',

  'bigInt',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  'decorators-legacy',
  'doExpressions',
  'dynamicImport',
  'exportDefaultFrom',
  'exportNamespaceFrom',
  'functionBind',
  'functionSent',
  'importMeta',
  'logicalAssignment',
  'nullishCoalescingOperator',
  'numericSeparator',
  'optionalChaining',
  'partialApplication',
  ['pipelineOperator', { proposal: 'smart' }],
  'throwExpressions',
]

const isPluginEnabled = function ({ enabled }) {
  return enabled
}

const getPluginsNames = function ({ names }) {
  return names
}
