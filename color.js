const hex = n => n.toString(16).replace(/^(.)$/, '0$1')

const clamp = x => Math.max(0, Math.min(255, x))

export default class {
  constructor (r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }

  add (delta) {
    this.r = clamp(this.r + (delta.r || 0))
    this.g = clamp(this.g + (delta.g || 0))
    this.b = clamp(this.b + (delta.b || 0))
  }

  subtract (delta) {
    this.r = clamp(this.r - (delta.r || 0))
    this.g = clamp(this.g - (delta.g || 0))
    this.b = clamp(this.b - (delta.b || 0))
  }

  warmth () {
    return 2 * this.r - this.b - this.g
  }

  setStyle ($swatch) {
    const cssColor = this._cssColor()
    this.$swatch.style.setProperty('background-color', cssColor)
    this.$swatch.innerHTML = ' ' + cssColor + ' '
  }

  cssColor () {
    return '#' + hex(this.r) + hex(this.g) + hex(this.b)
  }
}
