import { randInt } from './random.js'
import Color from './color.js'
import { step } from './index.js'

const N = 100

function * colorIndices () {
  for (let i = 0; i < N; ++i) {
    yield i
  }
}

const main = () => {
  const $n = document.getElementById('n')
  const $totalCost = document.getElementById('total-cost')
  const $swatches = document.getElementById('swatches')
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
      $swatch.innerHTML = ' ' + cssColor + ' '
    }
  }
  show()

  const iteration = () => {
    $totalCost.innerHTML = step(model)
    show()
    setTimeout(iteration, 0)
  }
  iteration()
}

window.addEventListener('DOMContentLoaded', main)
