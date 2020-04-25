import demo from '../web/demo.js'

import d3ColorDifference from 'd3-color-difference'
import d3Color from 'd3-color'
import injected from './injected.js'
const rgb = d3Color.rgb
const differenceCiede2000Weighted = d3ColorDifference.differenceCiede2000Weighted
injected.register({ rgb, differenceCiede2000Weighted })

demo()
