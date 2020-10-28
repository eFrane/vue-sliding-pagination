const { merge } = require('webpack-merge')
const path = require('path')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

let common = {
  externals: [
    'vue'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          hotReload: false
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
      },
      {
        test: /\.s?css$/,
        loader:
          [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
      },
    ]
  },
  output: {
    path: resolve('/dist')
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'style/vue-sliding-pagination.css',
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = [
  // browser build
  merge(common, {
    mode: 'production',
    entry: resolve('/src/plugin.js'),
    output: {
      filename: 'browser/vue-sliding-pagination.min.js',
    },
  }),

  // node module build
  merge(common, {
    mode: 'production',
    entry: resolve('/src/SlidingPagination.vue'),
    output: {
      filename: 'vue-sliding-pagination.umd.js',
      libraryTarget: 'umd',

      library: 'vue-sliding-pagination',
      umdNamedDefine: true
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: './src/styles/*',
          to: 'style/[name].[ext]',
          toType: 'template'
        }
      ]),
    ]
  })
];
