import cdc from 'https://dev.jspm.io/d3-color-difference'
import { shuffle } from './random.js'

const deltaE = cdc.differenceCiede2000

let t = 0.1

const acceptanceProbability = (dE) => 1 / (1 + Math.exp(dE / t))

export const step = colors => {
  let changed = false
  let totalCost = 0
  colors.forEach((_, i) => {
    const cost = () =>
      colors.reduce((sum, b) => {
        const a = colors[i]
        if (b === a) {
          return sum
        }
        const dE = deltaE(a.rgb, b.rgb)
        if (dE === 0.0) {
          return Infinity
        }
        return sum + 1 / dE
      }, 0)
    const origA = colors[i]
    let aBest = origA
    let bestCost = cost()
    shuffle(origA.perturbations()).forEach(aCandidate => {
      colors[i] = aCandidate
      const costCandidate = cost()
      if (Math.random() < acceptanceProbability(costCandidate - bestCost)) {
        changed = true
        bestCost = costCandidate
        aBest = aCandidate
      }
    })
    colors[i] = aBest
    totalCost += bestCost
  })
  t = t * 0.99
  return [totalCost, changed]
}
