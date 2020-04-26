import maxichrome from '../web/index.js'

// Defined as id in HTML file:
/* global
    colorCountElement
    swatchesAreaElement
    avoidColorElement
*/

const run = async () => {
  const colorCount = colorCountElement.value
  const avoidColor = avoidColorElement.value
  const colors = await maxichrome(colorCount, [avoidColor])
  while (swatchesAreaElement.children.length > colorCount) {
    swatchesAreaElement.lastElementChild.remove()
  }
  while (swatchesAreaElement.children.length < colorCount) {
    const swatchElement = document.createElement('SPAN')
    swatchElement.setAttribute('class', 'swatch')
    swatchesAreaElement.appendChild(swatchElement)
  }
  colors.forEach((color, i) => {
    const swatchElement = swatchesAreaElement.children[i]
    swatchElement.style.setProperty('color', avoidColor)
    swatchElement.style.setProperty('background-color', color)
    swatchElement.innerHTML = ' ' + color + ' '
  })
}

run()
colorCountElement.onchange = run
avoidColorElement.onchange = run
