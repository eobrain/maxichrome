import { randInt } from './random.js'
import Color from './color.js'
import Optimizer from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default inject => async colorCount => {
  function * colorIndices () {
    for (let i = 0; i < colorCount; ++i) {
      yield i
    }
  }

  const colors = [...colorIndices()].map(() =>
    new (Color(inject))(randInt(256), randInt(256), randInt(256))
  )

  const optimizer = Optimizer(inject)()
  let unchangedCount = 1
  while (unchangedCount < 100) {
    const [, , changed] = optimizer.step(colors)
    unchangedCount = changed ? 0 : unchangedCount + 1
    waitTillNextTick()
  }
  return colors.map(c => c.cssColor())
}
