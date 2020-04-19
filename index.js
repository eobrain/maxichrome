import cdc from 'https://dev.jspm.io/d3-color-difference'

const deltaE = cdc.differenceCiede2000

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
    origA.perturbations().forEach(aCandidate => {
      colors[i] = aCandidate
      const costCandidate = cost()
      if (costCandidate < bestCost) {
        changed = true
        bestCost = costCandidate
        aBest = aCandidate
      }
    })
    colors[i] = aBest
    totalCost += bestCost
  })
  return [totalCost, changed]
}
