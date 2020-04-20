import cdc from 'https://dev.jspm.io/d3-color-difference'
import { shuffle } from './random.js'

export default class {
  constructor (kL = 0.5, kC = 8, kH = 2) {
    this.deltaE = cdc.differenceCiede2000Weighted(kL, kC, kH)
    this.temperature = 10
  }

  _acceptanceProbability (dE) {
    return 1 / (1 + Math.exp(dE / this.temperature))
  }

  step (colors) {
    let changed = false
    let totalCost = 0
    colors.forEach((_, i) => {
      const cost = () => {
        let dEMin = Infinity
        colors.forEach((_, j) => {
          if (i === j) {
            return
          }
          const dE = this.deltaE(colors[i].rgb, colors[j].rgb)
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
        if (Math.random() < this._acceptanceProbability(costCandidate - bestCost)) {
          changed = true
          bestCost = costCandidate
          aBest = aCandidate
        }
      })
      colors[i] = aBest
      totalCost += bestCost
    })
    this.temperature *= 0.998
    const nearest = colors.map(a =>
      colors.reduce((min, b) =>
        a === b ? min : Math.min(min, this.deltaE(a.rgb, b.rgb)), Infinity))
    return [this.temperature, totalCost, changed, nearest]
  }
}
