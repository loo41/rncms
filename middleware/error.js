const {Log} = require('../src/server/model')

function error () {
  return async(ctx, next) => {
    try {
      await next()
    } catch (e) {
      console.log(e)
      let err = new Log({
        type: type,
        des: '服务错误',
        logs: e
      })
      await err.save()
      ctx.body = {code: 500, mes: '服务器端错误'}
    }
  }
}

module.exports =error