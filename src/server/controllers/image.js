const  {ImageLabel, Image} = require('../model')

exports.addLabel = async(ctx) => {
  const {label} = ctx.request.body
  let ImgLabel = new ImageLabel({label})
  await ImgLabel.save()
  ctx.body = {code: 200}
}

exports.labelList = async(ctx) => {
  let label = await ImageLabel.find({}).sort({_id: -1})
  ctx.body = {code: 200, label}
}

exports.delect = async(ctx) => {
  let {_id} = ctx.params
  await ImageLabel.remove({_id})
  ctx.body = {code: 200}
}

exports.uploadImg = async(ctx) => {
  const {title, label, type, banner} = ctx.request.body
  let img = new Image({
    title, label, type, banner
  })
  await img.save()
  ctx.body = {code: 200}
}

exports.list = async(ctx) => {
  const {page} = ctx.query
  const pageSize = 10
  const currentPage = page
  const skipnum = (currentPage - 1) * pageSize
  let data = await Image
                        .find({})
                        .sort({_id: -1})
                        .skip(skipnum)
                        .limit(pageSize)
  let total = await Image.count()
  ctx.body = {code: 200, data, total}
}

exports.delImage = async(ctx) => {
  let {_id} = ctx.params
  await Image.remove({_id})
  ctx.body = {code: 200}
}