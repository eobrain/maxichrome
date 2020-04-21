import { randInt } from './random.js'
import Color from './color.js'
import Optimizer from './index.js'

const N = 16

function * colorIndices () {
  for (let i = 0; i < N; ++i) {
    yield i
  }
}

const paramSets = [
  // [0.5, 0.5, 0.2],
  // [0.5, 0.2, 0.5],
  // [0.2, 0.5, 0.5], // <<< <<<
  // [0.3, 0.5, 0.5],
  // [0.5, 0.5, 0.5], // <<<
  // [0.5, 0.5, 1],
  // [0.5, 0.5, 2],
  // [0.5, 1, 0.2],
  // [0.2, 1, 0.5],
  // [0.5, 1, 0.5], // <<<
  // [0.5, 1, 1],
  // [0.5, 1, 2],
  // [0.5, 2, 0.2],
  // [0.3, 2, 0.3],
  // [0.2, 2, 0.5], // <<<
  // [0.3, 3, 0.5],
  // [0.4, 4, 0.5],
  // [0.5, 2, 0.5], // <<<
  // [0.5, 5, 0.5], // <<<
  // [0.5, 2, 1],
  // [0.2, 2, 2],
  // [0.5, 2, 2], // <<<
  // [0.5, 3, 2], // <<<
  // [0.2, 4, 2],
  // [0.5, 4, 2], // <<< <<<
  // [0.5, 5, 2], // <<< <<< <<<
  [0.5, 7, 2], // <<<
  [0.5, 8, 2], // <<<<<<<<<<<<<<<<<<
  [0.5, 9, 2],
  [0.5, 10, 2] // <<< <<<
  // [0.5, 20, 2]
  // [0.2, 5, 2]
  // [0.5, 2, 5],
  // [1, 0.5, 0.5],
  // [1, 0.5, 1],
  // [1, 0.5, 2],
  // [1, 1, 0.2],
  // [1, 1, 0.5], // <<<
  // [1, 1, 1],
  // [1, 1, 2],
  // [1, 2, 0.5],
  // [1, 2, 1],
  // [1, 2, 2],
  // [2, 0.5, 0.5],
  // [2, 0.5, 1],
  // [2, 0.5, 2],
  // [2, 1, 0.5],
  // [2, 1, 1] // <<<<
  // [5, 1, 1],
  // [2, 1, 2],
  // [2, 2, 0.5],
  // [2, 2, 1],
  // [2, 2, 2],
  // [5, 2, 2],
  // [2, 5, 2],
  // [2, 2, 5]
]

const main = () => {
  const $table = document.getElementById('table')

  for (const [kL, kC, kH] of paramSets) {
    const $tr = document.createElement('TR')
    $table.appendChild($tr)
    $tr.innerHTML = `<td>${kL}</td><td>${kC}</td><td>${kH}</td>`
    const $swatches = document.createElement('TD')
    $tr.appendChild($swatches)

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
        $swatch.style.setProperty('width', 50)
        $swatch.style.setProperty('height', 50)
      }
    }
    show()

    const optimizer = Optimizer(kL, kC, kH)
    let unchangedCount = 1
    const iteration = () => {
      const [, , changed] = optimizer.step(model)

      show()

      unchangedCount = changed ? 0 : unchangedCount + 1
      if (unchangedCount < 10) {
        setTimeout(iteration, 0)
      }
    }
    iteration()
  }
}

window.addEventListener('DOMContentLoaded', main)
