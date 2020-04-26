import test from 'ava'
import maxichromeDev from '../src/node/index_dev.js'

const kL = 0.5
const kC = 8
const kH = 2

test('minimum deltaE', async t => {
  const colors = await maxichromeDev(kL, kC, kH, 5)

  let dEMin = Infinity
  let dEMax = -Infinity
  for (let i = 0; i < 5; ++i) {
    for (let j = i + 1; j < 5; ++j) {
      const dE = colors[i].deltaE(kL, kC, kH, colors[j])
      dEMin = Math.min(dE, dEMin)
      dEMax = Math.max(dE, dEMax)
    }
  }

  t.true(dEMin < 60, `Expecting dEMin ${dEMin} to be < 60`)
  // t.true(dEMax < dEMin * 2, `Expecting dEMax ${dEMax} to be <${dEMin * 2}`)
})
