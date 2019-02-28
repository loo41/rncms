// const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CONST = require('../config/const')
const _ = require('./util')
const config = require('../config/setting')

module.exports = {
  devtool: '#source-map',
  output: {
    path: path.resolve(CONST.BASEPATH, 'dist'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    alias: Object.assign({
      '@': path.join(__dirname, '..', 'src/admin'),
      '~src': path.resolve(__dirname, '../src')
    }, config.admin.alias)
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: path.resolve(CONST.BASEPATH, 'src'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin([path.resolve(CONST.BASEPATH, 'dist')]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Rncms',
      template: path.resolve(CONST.BASEPATH, 'src/admin/public/index.html'),
      favicon: path.join(__dirname, '..', 'src/admin/public/favicon.ico'),
      filename: 'index.html'
    })
  ]
}