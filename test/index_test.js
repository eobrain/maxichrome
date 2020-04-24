import maxichrome from '../src/index.js'
import d3ColorDifference from 'd3-color-difference'
import d3Color from 'd3-color'
import test from 'ava'

const inject = { d3Color, d3ColorDifference }

test('count', async t => {
  const colors = await maxichrome(inject)(2)
  t.is(colors.length, 2)
})
