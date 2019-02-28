const webpack = require('webpack')
const config = require('./webpack.dev.conf.js')
const webpackMiddleware = require("koa-webpack-dev-middleware")
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const convert = require('koa-convert')
const compiler = webpack(config)

function devServer (app) {
  app.use(webpackMiddleware(compiler, {
    noInfo: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    reload: true,
    hot: true,
    watchContentBase: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    historyApiFallback: {
      disableDotRule: true,
    }
  }))
  app.use(convert(webpackHotMiddleware(compiler)))
}

module.exports = devServer