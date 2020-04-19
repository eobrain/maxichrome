import cdc from 'https://dev.jspm.io/d3-color-difference'
import { shuffle } from './random.js'

const deltaE = cdc.differenceCiede2000

let t = 1

const acceptanceProbability = (dE) => 1 / (1 + Math.exp(dE / t))

export const step = colors => {
  let changed = false
  let totalCost = 0
  colors.forEach((_, i) => {
    const cost = () => {
      let dEMin = Infinity
      colors.forEach((_, j) => {
        if (i === j) {
          return
        }
        const dE = deltaE(colors[i].rgb, colors[j].rgb)
        if (dE < dEMin) {
          dEMin = dE
        }
      })
      return -dEMin
    }
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
  t = t * 0.999
  const nearest = colors.map(a =>
    colors.reduce((min, b) => a === b ? min : Math.min(min, deltaE(a.rgb, b.rgb)), Infinity))
  return [t, totalCost, changed, nearest]
}
