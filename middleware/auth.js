let notCheck = []
const {Admin, PassRouter} = require('../src/server/model')
const {istoken} = require('./utils/token')

async function getPassRouter() {
    let pass = await PassRouter.find({})
    notCheck = pass[0].router
}

function auth () {
  return async(ctx, next) => {
    await getPassRouter()
    if (ctx.path.indexOf('/manage') === -1) return await next()
    let router = ctx.path = ctx.path.replace('/manage', '')
    if (router.indexOf('.') !== -1) return await next()
    if (notCheck.indexOf(router) !== -1) return await next()
    if (!ctx.headers.token) {return ctx.body = {code: 1100, mes: '无效Token'}}
    let user = await istoken(ctx)
    if (!user) {return ctx.body = {code: 1100, mes: '管理员不存在'} }
    let admin = await Admin.findOne({_id: user._id})
    const {power, superAdmin, effect} = admin
    if (!effect) {return ctx.body = {code: 1100, mes: '用户无效'}}
    if (superAdmin) return await next()
    if (power.indexOf(ctx.headers.key) === -1) {return ctx.body = {code: 1100, mes: '对不起 您没有操作权限'}} 
      else {
        return await next()
      }
  }
}


module.exports = auth