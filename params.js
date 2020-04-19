import { randInt } from './random.js'
import Color from './color.js'
import Optimizer from './index.js'

const N = 16

function * colorIndices () {
  for (let i = 0; i < N; ++i) {
    yield i
  }
}

const kLs = [0.5, 1, 2]
const kCs = [0.5, 1, 2]
const kHs = [0.5, 1, 2]

const main = () => {
  const $table = document.getElementById('table')

  for (const kL of kLs) {
    for (const kC of kCs) {
      for (const kH of kHs) {
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
            $swatch.style.setProperty('color', model[i].invert().cssColor())
            $swatch.innerHTML = ' ' + cssColor + ' '
          }
        }
        show()

        const optimizer = new Optimizer(kL, kC, kH)
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
  }
}

window.addEventListener('DOMContentLoaded', main)
