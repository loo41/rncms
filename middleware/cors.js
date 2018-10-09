const {server} = require('../config/setting')
var cors = require('koa-cors')

function cors(app) {
  return async(ctx, next) => {
    if (process.env.NODE_ENV === 'development' || server.cors) {
      app.use(cors())
      await next()
    } else {
      await next()
    }
  }
}

module.exports = cors