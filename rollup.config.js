import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/node/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs'
    }
  },
  {
    input: 'src/node/index.js',
    output: {
      file: 'dist/web.js',
      format: 'iife',
      name: 'maxichrome'
    },
    plugins: [resolve()]
  },
  {
    input: 'src/node/index.js',
    output: {
      file: 'dist/web.min.js',
      format: 'iife',
      name: 'maxichrome'
    },
    plugins: [resolve(), terser()]
  }
]
