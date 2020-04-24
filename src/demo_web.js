import demo from './demo.js'
import { differenceCiede2000Weighted } from 'https://unpkg.com/d3-color-difference?module'
import { rgb } from 'https://unpkg.com/d3-color?module'

const d3Color = { rgb }
const d3ColorDifference = { differenceCiede2000Weighted }

demo({ d3Color, d3ColorDifference })
