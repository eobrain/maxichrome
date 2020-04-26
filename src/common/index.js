import { randInt } from './random.js'
import ColorInject from './color.js'
import Optimizer from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default dependencies => {
  const Color = ColorInject(dependencies)

  return async (colorCount, avoid = []) => {
    function * colorIndices () {
      for (let i = 0; i < colorCount; ++i) {
        yield i
      }
    }

    const colors = [...colorIndices()].map(() =>
      new Color(randInt(256), randInt(256), randInt(256))
    )

    const optimizer = Optimizer()
    while (true) {
      const [, changed] = optimizer.step(
        colors,
        avoid.map(cssColor => new Color(cssColor))
      )
      if (!changed) {
        colors.sort((a, b) => b.warmth() - a.warmth())
        return colors.map(c => c.cssColor())
      }
      waitTillNextTick()
    }
  }
}
