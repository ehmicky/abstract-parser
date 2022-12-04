import test from 'ava'

import { babel } from 'abstract-parser'

test('Dummy test', (t) => {
  t.is(typeof babel.parse, 'function')
})
