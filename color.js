import dc from 'https://dev.jspm.io/d3-color'

const rgb = dc.rgb

const hex = n => n.toString(16).replace(/^(.)$/, '0$1')

const clamp = x => Math.max(0, Math.min(255, x))

function * near (x) {
  for (let i = Math.max(0, x - 1); i <= Math.min(255, x + 1); ++i) {
    yield i
  }
}

class Color {
  constructor (r, g, b) {
    this.rgb = rgb(r, g, b)
  }

  invert () {
    return new Color(
      255 - this.rgb.r,
      255 - this.rgb.g,
      255 - this.rgb.b
    )
  }

  /** @return list of colors that differ by one unit of r, g, b */
  perturbations () {
    const result = []
    for (const r of near(this.rgb.r)) {
      for (const g of near(this.rgb.g)) {
        for (const b of near(this.rgb.b)) {
          if (r === this.rgb.r && g === this.rgb.g && b === this.rgb.b) {
            continue
          }
          result.push(new Color(r, g, b))
        }
      }
    }
    return result
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

export default Color
