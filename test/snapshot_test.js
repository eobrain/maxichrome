import maxichrome from '../dist/index.cjs'
import test from 'ava'

test('No avoid', async t => {
  for (let n = 1; n < 10; ++n) {
    t.snapshot(await maxichrome(n, []), `${n}`)
  }
})

test('Avoid white', async t => {
  for (let n = 1; n < 10; ++n) {
    t.snapshot(await maxichrome(n, ['white']), `${n}`)
  }
})
