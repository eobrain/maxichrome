import ColorInject from './color.js'
import Optimizer from './optimizer.js'

/**
 * @returns {Promise} promise that resolves on next tick.
 */
const waitTillNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

export default dependencies => {
  const Color = ColorInject(dependencies)

  return async (kL, kC, kH, colorCount) => {
    const cubeRoot = Math.pow(colorCount, 1 / 3.0)
    const sep = Math.round(256 / (cubeRoot + 1))
    const halfSep = Math.floor(sep / 2)

    const colorGrid = () => {
      const result = []
      for (let r = halfSep; r < 256; r += sep) {
        for (let g = halfSep; g < 256; g += sep) {
          for (let b = halfSep; b < 256; b += sep) {
            result.push(new Color(r, g, b))
            if (result.length === colorCount) {
              return result
            }
          }
        }
      }
      throw new Error('Assertion failed. Not enough colors.')
    }
    const colors = colorGrid()

    const optimizer = Optimizer(kL, kC, kH)
    while (true) {
      const [, changed] = optimizer.step(colors, [])
      if (!changed) {
        return colors
      }
      waitTillNextTick()
    }
  }
}
