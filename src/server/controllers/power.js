const {PassRouter} = require('../model')

exports.list = async(ctx) => {
  let list = await PassRouter.find({})
  ctx.body = {code: 200, list: list[0].router, _id: list[0]._id}
}

exports.setPower = async(ctx) => {
  let {_id, router} = ctx.request.body
  await PassRouter.update({_id}, {$set: {router}})
  ctx.body = {code: 200}
}