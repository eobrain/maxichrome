import { randInt } from './random.js'
import ColorInject from './color.js'
import Optimizer from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default dependencies => {
  const Color = ColorInject(dependencies)

  const hillClimb = async (kL, kC, kH, colorCount) => {
    function * colorIndices () {
      for (let i = 0; i < colorCount; ++i) {
        yield i
      }
    }

    const colors = [...colorIndices()].map(() =>
      new Color(randInt(256), randInt(256), randInt(256))
    )

    const optimizer = Optimizer(kL, kC, kH)
    while (true) {
      const [, changed, nearests] = optimizer.step(colors)
      if (!changed) {
        return [colors, nearests]
      }
      waitTillNextTick()
    }
  }

  return async (kL, kC, kH, colorCount, tries) => {
    let bestColors
    let farthestNearest = 0
    for (let i = 0; i < tries; ++i) {
      const [colors, nearests] = await hillClimb(kL, kC, kH, colorCount)
      const nearest = nearests.reduce((acc, x) => Math.min(acc, x))
      if (nearest > farthestNearest) {
        farthestNearest = nearest
        bestColors = colors
      }
    }
    return bestColors
  }
}
