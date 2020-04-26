import { randInt } from '../common/random.js'
import ColorInject from '../common/color.js'
import Optimizer from '../common/optimizer.js'
import { differenceCiede2000Weighted } from 'https://unpkg.com/d3-color-difference?module'
import { rgb, color } from 'https://unpkg.com/d3-color?module'

const dependencies = { rgb, color, differenceCiede2000Weighted }
const Color = ColorInject(dependencies)

const colorCount = 5

function * colorIndices () {
  for (let i = 0; i < colorCount; ++i) {
    yield i
  }
}

const main = () => {
  const $n = document.getElementById('n')
  const $duration = document.getElementById('duration')
  const $totalCost = document.getElementById('total-cost')
  const $state = document.getElementById('state')
  const $swatches = document.getElementById('swatches')
  const $nearest = document.getElementById('nearest')
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
  let unchangedCount = 1

  /* global performance */
  const start = performance.now()
  const iteration = () => {
    const [totalCost, changed, nearest] = optimizer.step(colors, [])
    $totalCost.innerHTML = totalCost
    $state.innerHTML = changed ? 'Optimizing...' : 'Found optimum.'

    $nearest.innerHTML = nearest.map((dE, i) =>
      `<div style="background-color:${colors[i].cssColor()};height:5px;width:${0.1 * dE * colorCount}%"></div>`).join('')

    show()

    unchangedCount = changed ? 0 : unchangedCount + 1
    if (unchangedCount < 100) {
      setTimeout(iteration, 0)
    } else {
      const elapsed = performance.now() - start
      $duration.innerHTML = elapsed / 1000
    }
  }
  iteration()
}

window.addEventListener('DOMContentLoaded', main)
