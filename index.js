import cdc from 'https://dev.jspm.io/d3-color-difference'
import { shuffle } from './random.js'

const State = Object.freeze({ heating: 1, cooling: 2, hillClimbing: 3 })

export default class {
  constructor (kL = 0.5, kC = 8, kH = 2) {
    this.deltaE = cdc.differenceCiede2000Weighted(kL, kC, kH)
    this.temperature = 0.0000001
    this.state = State.heating
  }

  _acceptanceProbability (dE) {
    return 1 / (1 + Math.exp(dE / this.temperature))
  }

  step (colors) {
    let acceptedCount = 0
    let totalCount = 0
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
          ++acceptedCount
          bestCost = costCandidate
          aBest = aCandidate
        }
        ++totalCount
      })
      colors[i] = aBest
      totalCost += bestCost
    })
    switch (this.state) {
      case State.heating:
        this.temperature *= 1.1
        if (acceptedCount > totalCount / 2) {
          this.state = State.cooling
        }
        break
      case State.cooling:
        this.temperature *= 0.998
        if (acceptedCount === 0) {
          this.temperature = 0
          this.state = State.hillClimb
        }
        break
      case State.hillClimb:
        break
    }
    const nearest = colors.map(a =>
      colors.reduce((min, b) =>
        a === b ? min : Math.min(min, this.deltaE(a.rgb, b.rgb)), Infinity))
    return [this.temperature, totalCost, this.state !== State.hillClimb || acceptedCount > 0, nearest]
  }
}
