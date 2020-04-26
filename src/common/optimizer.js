import { shuffle } from './random.js'

const arrayOf = makeElement => n => [...Array(n)].map((_, i) => makeElement(i))

const Stats = () => {
  let min_ = Infinity
  const put = x => {
    min_ = Math.min(min_, x)
  }
  const min = () => min_
  return { put, min }
}

export default (kL = 0.5, kC = 8, kH = 2) => {
  const step = (colors, avoid) => {
    let acceptedCount = 0
    let totalCost = 0
    const dEMatrix = arrayOf(() => [])(colors.length)
    colors.forEach((_, i) => {
      const cost = () => {
        const stats = Stats()
        colors.forEach((colorJ, j) => {
          if (i === j) {
            return
          }
          const dE = colors[i].deltaE(kL, kC, kH, colorJ)
          stats.put(dE)
          dEMatrix[i][j] = dE
        })
        avoid.forEach(avoidColor => {
          const dE = colors[i].deltaE(kL, kC, kH, avoidColor)
          stats.put(dE)
        })
        return -stats.min()
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
    return [totalCost, acceptedCount > 0, dEMatrix]
  }

  return { step }
}
