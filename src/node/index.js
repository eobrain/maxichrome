import maxichrome from '../common/index.js'
import d3ColorDifference from 'd3-color-difference'
import d3Color from 'd3-color'

const rgb = d3Color.rgb
const differenceCiede2000Weighted = d3ColorDifference.differenceCiede2000Weighted

export default maxichrome({ rgb, differenceCiede2000Weighted })
