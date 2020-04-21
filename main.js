import { randInt } from './random.js'
import Color from './color.js'
import Optimizer from './index.js'

const N = 20

function * colorIndices () {
  for (let i = 0; i < N; ++i) {
    yield i
  }
}

const main = () => {
  const $n = document.getElementById('n')
  const $t = document.getElementById('t')
  const $totalCost = document.getElementById('total-cost')
  const $state = document.getElementById('state')
  const $swatches = document.getElementById('swatches')
  const $nearest = document.getElementById('nearest')
  $n.innerHTML = N

  const $newSwatch = () => {
    const $swatch = document.createElement('SPAN')
    $swatch.setAttribute('class', 'swatch')
    $swatches.appendChild($swatch)
    return $swatch
  }

  const view = [...colorIndices()].map(() => $newSwatch())

  const model = [...colorIndices()].map(() =>
    new Color(randInt(256), randInt(256), randInt(256))
  )

  const show = () => {
    model.sort((a, b) => a.warmth() - b.warmth())
    for (const i of colorIndices()) {
      const cssColor = model[i].cssColor()
      const $swatch = view[i]
      $swatch.style.setProperty('background-color', cssColor)
      $swatch.style.setProperty('color', model[i].invert().cssColor())
      $swatch.innerHTML = ' ' + cssColor + ' '
    }
  }
  show()

  const optimizer = Optimizer()
  let unchangedCount = 1
  const iteration = () => {
    const [t, totalCost, changed, nearest] = optimizer.step(model)
    $totalCost.innerHTML = totalCost
    $t.innerHTML = t
    $state.innerHTML = changed ? 'Optimizing...' : 'Found optimum.'

    $nearest.innerHTML = nearest.map((dE, i) =>
      `<div style="background-color:${model[i].cssColor()};height:5px;width:${0.1 * dE * N}%"></div>`).join('')

    show()

    unchangedCount = changed ? 0 : unchangedCount + 1
    if (unchangedCount < 100) {
      setTimeout(iteration, 0)
    }
  }
  iteration()
}

window.addEventListener('DOMContentLoaded', main)
