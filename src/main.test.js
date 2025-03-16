import { babel } from 'abstract-parser'
import test from 'ava'

test('Dummy test', (t) => {
  t.is(typeof babel.parse, 'function')
})
