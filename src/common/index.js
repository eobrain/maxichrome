import { randInt } from './random.js'
import ColorInject from './color.js'
import Optimizer from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default dependencies => {
  const Color = ColorInject(dependencies)

  const hillClimb = async colorCount => {
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
      const [, changed, nearest] = optimizer.step(colors)
      if (!changed) {
        return [colors, nearest]
      }
      waitTillNextTick()
    }
  }

  return async (colorCount, tries = 1) => {
    let bestColors
    let farthestNearest = 0
    for (let i = 0; i < tries; ++i) {
      const [colors, nearests] = await hillClimb(colorCount)
      const nearest = nearests.reduce((acc, x) => Math.min(acc, x))
      if (nearest > farthestNearest) {
        farthestNearest = nearest
        bestColors = colors
      }
    }
    bestColors.sort((a, b) => b.warmth() - a.warmth())
    return bestColors.map(c => c.cssColor())
  }
}
