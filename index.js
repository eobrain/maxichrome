import cdc from 'https://dev.jspm.io/d3-color-difference'
import { randColorChange } from './random.js'

const deltaE = cdc.differenceCiede2000

export const step = colors => {
  let totalCost = 0
  colors.forEach(a => {
    const cost = () =>
      colors.reduce((sum, b) => {
        if (a === b) {
          return sum
        }
        const dE = deltaE(a.rgb, b.rgb)
        if (dE === 0.0) {
          return Infinity
        }
        return sum + 1 / dE
      }, 0)
    const costBefore = cost()
    const change = randColorChange()
    a.add(change)
    const costAfter = cost()
    if (costAfter > costBefore) {
      // reject
      a.subtract(change)
      totalCost += costAfter
    } else {
      // accept
      totalCost += costAfter
    }
  })
  return totalCost
}
