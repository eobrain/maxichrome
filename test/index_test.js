import maxichrome from '../src/index.js'
import test from 'ava'

test('count', async t => {
  const colors = await maxichrome(2)
  t.is(colors.length, 2)
})
