import { randInt } from '../common/random.js'
import ColorInject from '../common/color.js'
import Optimizer from '../common/optimizer.js'
import { differenceCiede2000Weighted } from 'https://unpkg.com/d3-color-difference?module'
import { rgb, color } from 'https://unpkg.com/d3-color?module'

const dependencies = { rgb, color, differenceCiede2000Weighted }
const Color = ColorInject(dependencies)

// HTML element id
/* global
   meanCostElement
   barChartElement
 */

const colorCount = 5

function * colorIndices () {
  for (let i = 0; i < colorCount; ++i) {
    yield i
  }
}

const main = () => {
  const $n = document.getElementById('n')
  const $duration = document.getElementById('duration')
  const $state = document.getElementById('state')
  const $swatches = document.getElementById('swatches')
  $n.innerHTML = colorCount

  const $newSwatch = () => {
    const $swatch = document.createElement('SPAN')
    $swatch.setAttribute('class', 'swatch')
    $swatches.appendChild($swatch)
    return $swatch
  }

  const view = [...colorIndices()].map(() => $newSwatch())

  const colors = [...colorIndices()].map(() =>
    new Color(randInt(256), randInt(256), randInt(256))
  )

  const show = () => {
    colors.sort((a, b) => a.warmth() - b.warmth())
    for (const i of colorIndices()) {
      const cssColor = colors[i].cssColor()
      const $swatch = view[i]
      $swatch.style.setProperty('background-color', cssColor)
      $swatch.style.setProperty('color', colors[i].invert().cssColor())
      $swatch.innerHTML = ' ' + cssColor + ' '
    }
  }
  show()

  const optimizer = Optimizer()

  const bar = (thisColor, otherColor, dE, colorCount) => `
  <div style="color:${otherColor.cssColor()};background-color:${thisColor.cssColor()};width:${0.1 * dE * colorCount}%">
    ${thisColor.cssColor()} ${dE}
  </div>`

  /* global performance */
  const start = performance.now()
  const iteration = () => {
    const [totalCost, changed, dEMatrix] = optimizer.step(colors, [])
    meanCostElement.innerHTML = totalCost / colors.length
    $state.innerHTML = changed ? 'Optimizing...' : 'Found optimum.'

    barChartElement.innerHTML = dEMatrix.map((row, i) =>
      row.map((dE, j) =>
        bar(colors[i], colors[j], dE, colorCount) +
        bar(colors[j], colors[i], dE, colorCount)
      ).join('')
    ).join('')

    show()

    if (changed) {
      setTimeout(iteration, 0)
    } else {
      const elapsed = performance.now() - start
      $duration.innerHTML = elapsed / 1000
    }
  }
  iteration()
}

window.addEventListener('DOMContentLoaded', main)
