import cdc from 'https://dev.jspm.io/d3-color-difference'
import { randColorChange } from './random.js'

const deltaE = cdc.differenceCiede2000

export const step = colors => {
  colors.forEach(a => {
    const dClosest = () =>
      colors.reduce((min, b) =>
        Math.min(min, deltaE(a, b)), Infinity)
    const dBefore = dClosest()
    const change = randColorChange()
    a.add(change)
    const dAfter = dClosest()
    if (dAfter < dBefore) {
      a.subtract(change)
    }
  })
}
