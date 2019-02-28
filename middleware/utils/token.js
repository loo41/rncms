const jwt = require('jwt-simple')
const secret = 'recms'
const moment = require('moment')

exports.creatToken = async (Options) => {
  const times = moment().add(1, 'days').valueOf()
  let payload = {exp: times}
  Object.assign(payload, Options)
  return jwt.encode(payload, secret)
}

exports.istoken = async (ctx, Token) => {
  let token = Token || ctx.headers.token 
              || ctx.query.token
              || ctx.header.token
              || ctx.request.body.token
              ||ctx.body.token;
  if (!token) {
    ctx.status = 404
    ctx.body = {code: 404, mes: '用户不存在'}
    return false
  }
  let user = jwt.decode(token, secret, 'HS256')
  if (user.exp + 86400 < Date.now()) {
    ctx.status = 401;
    ctx.body = {state: 105, mes: 'token过期'}
    return false
  }
  return user
}
