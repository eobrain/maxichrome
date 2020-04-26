import maxichromeInject from '../common/index_dev.js'
import d3ColorDifference from 'd3-color-difference'
import d3Color from 'd3-color'

const dependencies = {
  rgb: d3Color.rgb,
  color: d3Color.color,
  differenceCiede2000Weighted: d3ColorDifference.differenceCiede2000Weighted
}
export default maxichromeInject(dependencies)
