import VuePlugin from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sizes from '@atomico/rollup-plugin-sizes'
import PostCSS from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

const pkg = require('./package.json')

const plugins = [
  nodeResolve(),
  VuePlugin(),
  commonjs(),
  PostCSS({
    plugins: [autoprefixer()]
  }),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
  }),
  cleanup(),
  sizes()
]

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'VueFinalModal',
      sourcemap: true,
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['vue'],
  plugins
}
