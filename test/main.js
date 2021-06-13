// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import { babel } from 'abstract-parser'
import test from 'ava'

test('Dummy test', (t) => {
  t.is(typeof babel, 'function')
})
