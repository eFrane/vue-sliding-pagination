const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let cssExtract = new ExtractTextPlugin('vue-sliding-pagination.css')

function resolve (dir) {
  return path.join(__dirname, dir)
}

let common = {
  externals: [
    'vue'
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      }
    ]
  },
  output: {
    path: resolve('/dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = [
  // browser build
  merge(common, {
    entry: resolve('/src/plugin.js'),
    output: {
      filename: 'vue-sliding-pagination.min.js',
      libraryTarget: 'window',
      library: 'VueSlidingPagination',
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'vue-style-loader!css-loader!post-css-loader!sass-loader',
        }
      ]
    }
  }),

  // node module build
  merge(common, {
    entry: resolve('/src/SlidingPagination.vue'),
    output: {
      filename: 'vue-sliding-pagination.umd.js',
      libraryTarget: 'umd',

      library: 'vue-sliding-pagination',
      umdNamedDefine: true
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: cssExtract.extract({
            use: [
              'css-loader',
              'post-css-loader',
              'sass-loader'
            ],
            fallback: 'vue-style-loader'
          })
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './src/styles/*',
          to: 'scss/[name].[ext]',
          toType: 'template'
        }
      ]),
      cssExtract
    ]
  })
];
