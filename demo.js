import maxichrome from './index.js'

const demo = async () => {
  const $swatches = document.getElementById('swatches')
  const $colorCount = document.getElementById('color-count')

  const run = async () => {
    const colorCount = $colorCount.value
    const colors = await maxichrome(colorCount)
    while ($swatches.children.length > colorCount) {
      $swatches.lastElementChild.remove()
    }
    while ($swatches.children.length < colorCount) {
      const $swatch = document.createElement('SPAN')
      $swatch.setAttribute('class', 'swatch')
      $swatches.appendChild($swatch)
    }
    colors.forEach((color, i) => {
      const $swatch = $swatches.children[i]
      $swatch.style.setProperty('background-color', color)
      $swatch.innerHTML = ' ' + color + ' '
    })
  }

  await run()
  $colorCount.onchange = run
}

window.addEventListener('DOMContentLoaded', demo)
