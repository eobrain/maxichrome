import { randInt } from './random.js'
import ColorInject from './color.js'
import OptimizerInject from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default dependencies => {
  const Color = ColorInject(dependencies)
  const Optimizer = OptimizerInject(dependencies)

  return async colorCount => {
    function * colorIndices () {
      for (let i = 0; i < colorCount; ++i) {
        yield i
      }
    }

    const colors = [...colorIndices()].map(() =>
      new Color(randInt(256), randInt(256), randInt(256))
    )

    const optimizer = Optimizer()
    let unchangedCount = 1
    while (unchangedCount < 100) {
      const [, , changed] = optimizer.step(colors)
      unchangedCount = changed ? 0 : unchangedCount + 1
      waitTillNextTick()
    }
    return colors.map(c => c.cssColor())
  }
}
