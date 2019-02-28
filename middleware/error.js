const {Log} = require('../src/server/model')

function error () {
  return async(ctx, next) => {
    try {
      await next()
    } catch (e) {
      let err = new Log({
        type: 1,
        des: '服务错误',
        logs: e
      })
      await err.save()
      ctx.body = {code: 500, mes: '服务器端错误'}
      console.log(e)
    }
  }
}

module.exports =error