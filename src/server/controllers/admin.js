const {creatToken} = require('../utils/token')
const {Admin, Log, News, Article, User, Mongo} = require('../model')

exports.login = async(ctx) => {
  const {username, password} = ctx.request.body
  let user = await Admin.find({username, password})
  if (user.length === 0) {
    ctx.body = {code: 404, mes: '用户不存在'}
    return
  }
  let token = await creatToken({_id: user[0]._id, username})
  let ip = ctx.ip
  if(ctx.headers['x-real-ip']) ip = ctx.headers['x-real-ip']
  let log = new Log({
    type: 2,
    des: '登陆信息',
    logs: `${username}在${ip}处登陆`
  })
  await log.save()
  ctx.body = {code: 200, token}
}

exports.list = async(ctx) => {
  let user = await Admin.find({}).sort({_id: -1})
  user.forEach((item, i) => {
    user[i].password = 'rncmsrncms'
  })
  ctx.body = {code: 200, user}
}

exports.addUser = async(ctx) => {
  const {user} = ctx.request.body
  const {username, password,
    email, phone, power, effect,
    receiveMail, superAdmin
  } = user
  let userIsEx = await Admin.find({username})
  if (userIsEx.length !== 0) {
    ctx.body = {code: 403, mes: '管理员已存在'}
    return
  }
  let admin = new Admin({
    username, password, email,
    phone, power, effect, receiveMail, superAdmin
  })
  await admin.save()
  ctx.body ={code: 200}
}

exports.remove = async(ctx) => {
  const {_id} = ctx.query
  await Admin.remove({_id})
  ctx.body = {code: 200}
}

exports.updateUser = async(ctx) => {
  const {user} = ctx.request.body
  const {_id, username, password,
    email, phone, power, effect,
    receiveMail, superAdmin
  } = user
  let admin = await Admin.find({_id})
  if (admin.length === 0) {
    ctx.body = {code: 404, mes: '管理员不存在'}
    return
  }
  if (password !== 'rncmsrncms') {
    await Admin.update({_id}, {$set: {username, password, email, phone, power, effect, receiveMail, superAdmin}})
  } else {
    await Admin.update({_id}, {$set: {username, email, phone, power, effect, receiveMail, superAdmin}})
  }
  ctx.body = {code: 200}
}

exports.checkPower = async(ctx) => {
  ctx.body = {code: 200}
}

exports.homeData = async(ctx) => {
  let admin = await Admin.count()
  let message = await News.count()
  let news = await Article.count()
  ctx.body = {code: 200, admin, message, news}
}

exports.baseData = async(ctx) => {
  let [admin, news, message, user, mongo, log] = await Promise.all([
    Admin.count(),
    Article.count(),
    News.count(),
    User.count(),
    Mongo.count(),
    Log.count()
  ])
  ctx.body = {code: 200, data: [admin, news, message, user, mongo, log]}
}