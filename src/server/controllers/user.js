const {User, Reply, Message} = require('../model')

exports.delect = async(ctx) => {
  const {_id} = ctx.params
  let user = await User.findByIdAndRemove({_id})
  let {collect} = user
  collect.forEach(async(item) => {
    if (!item) return
    await Reply.remove({user: item})
  })
  ctx.body = {code: 200}
}

exports.search = async(ctx) => {
  let {username} = ctx.query
  username = new RegExp(username, 'ig')
  let userList = await User.find({username})
  ctx.body = {code: 200, userList}
}

exports.list = async(ctx) => {
  let {page} = ctx.params
  let {limit} = ctx.query
  page = Number(page)
  limit = Number(limit)
  const currentPage = page
  const skipnum = (currentPage - 1) * limit
  let list = await User
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(limit)
  let total = await User.count()
  ctx.body = {code: 200, list, total}
}

exports.addUser = async(ctx) => {
  const {username, password, email, phone, sex} = ctx.request.body
  let user = new User({username, password, email, phone, sex})
  await user.save()
  ctx.body = {code: 200}
}

exports.message = async(ctx) => {
  let {page} = ctx.params
  page = Number(page)
  const currentPage = page
  const skipnum = (currentPage - 1) * 20
  let list = await Message
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(20)
  let total = await Message.count()
  ctx.body = {code: 200, list, total}
}