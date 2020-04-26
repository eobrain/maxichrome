import { shuffle } from './random.js'

export default (kL = 0.5, kC = 8, kH = 2) => {
  const step = (colors, avoid) => {
    let acceptedCount = 0
    let totalCost = 0
    colors.forEach((_, i) => {
      const cost = () => {
        let dEMin = Infinity
        colors.forEach((colorJ, j) => {
          if (i === j) {
            return
          }
          const dE = colors[i].deltaE(kL, kC, kH, colorJ)
          if (dE < dEMin) {
            dEMin = dE
          }
        })
        avoid.forEach(avoidColor => {
          const dE = colors[i].deltaE(kL, kC, kH, avoidColor)
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
        if (costCandidate < bestCost) {
          ++acceptedCount
          bestCost = costCandidate
          aBest = aCandidate
        }
      })
      colors[i] = aBest
      totalCost += bestCost
    })
    const nearest = colors.map(a =>
      colors.reduce((min, b) =>
        a === b ? min : Math.min(min, a.deltaE(kL, kC, kH, b)), Infinity))
    return [totalCost, acceptedCount > 0, nearest]
  }

  return { step }
}
