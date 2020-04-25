import maxichromeInject from '../common/index.js'
import { differenceCiede2000Weighted } from 'https://unpkg.com/d3-color-difference?module'
import { rgb } from 'https://unpkg.com/d3-color?module'

const dependencies = { rgb, differenceCiede2000Weighted }
export default maxichromeInject(dependencies)
