import maxichrome from '../src/node/index.js'
import test from 'ava'

test('count', async t => {
  const colors = await maxichrome(2, [])
  t.is(colors.length, 2)
})

test('default emtpy avoid list', async t => {
  const colors = await maxichrome(2)
  t.is(colors.length, 2)
})
