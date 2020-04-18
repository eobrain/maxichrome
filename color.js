import dc from 'https://dev.jspm.io/d3-color'

const rgb = dc.rgb

const hex = n => n.toString(16).replace(/^(.)$/, '0$1')

const clamp = x => Math.max(0, Math.min(255, x))

export default class {
  constructor (r, g, b) {
    this.rgb = rgb(r, g, b)
  }

  add (delta) {
    const r = clamp(this.rgb.r + (delta.r || 0))
    const g = clamp(this.rgb.g + (delta.g || 0))
    const b = clamp(this.rgb.b + (delta.b || 0))
    this.rgb = rgb(r, g, b)
  }

  subtract (delta) {
    const r = clamp(this.rgb.r - (delta.r || 0))
    const g = clamp(this.rgb.g - (delta.g || 0))
    const b = clamp(this.rgb.b - (delta.b || 0))
    this.rgb = rgb(r, g, b)
  }

  warmth () {
    return 2 * this.rgb.r - this.rgb.b - this.rgb.g
  }

  setStyle ($swatch) {
    const cssColor = this._cssColor()
    this.$swatch.style.setProperty('background-color', cssColor)
    this.$swatch.innerHTML = ' ' + cssColor + ' '
  }

  cssColor () {
    return '#' + hex(this.rgb.r) + hex(this.rgb.g) + hex(this.rgb.b)
  }
}
