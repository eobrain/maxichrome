import maxichromeInject from '../common/index.js'
import { differenceCiede2000Weighted } from 'd3-color-difference'
import { rgb, color } from 'd3-color'

const dependencies = { rgb, color, differenceCiede2000Weighted }

export default maxichromeInject(dependencies)
