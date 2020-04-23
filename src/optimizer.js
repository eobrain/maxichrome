// import cdc from 'https://dev.jspm.io/d3-color-difference'
import { differenceCiede2000Weighted } from 'd3-color-difference'
import { shuffle } from './random.js'

const State = Object.freeze({ heating: 1, cooling: 2, hillClimbing: 3 })

export default (kL = 0.5, kC = 8, kH = 2) => {
  const deltaE = differenceCiede2000Weighted(kL, kC, kH)
  let temperature = 0.0000001
  let state = State.heating

  const acceptanceProbability = dE => 1 / (1 + Math.exp(dE / temperature))

  const step = colors => {
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
          ++acceptedCount
          bestCost = costCandidate
          aBest = aCandidate
        }
        ++totalCount
      })
      colors[i] = aBest
      totalCost += bestCost
    })
    switch (state) {
      case State.heating:
        temperature *= 1.1
        if (acceptedCount > totalCount / 2) {
          state = State.cooling
        }
        break
      case State.cooling:
        temperature *= 0.998
        if (acceptedCount === 0) {
          temperature = 0
          state = State.hillClimb
        }
        break
      case State.hillClimb:
        break
    }
    const nearest = colors.map(a =>
      colors.reduce((min, b) =>
        a === b ? min : Math.min(min, deltaE(a.rgb, b.rgb)), Infinity))
    return [temperature, totalCost, state !== State.hillClimb || acceptedCount > 0, nearest]
  }

  return { step }
}