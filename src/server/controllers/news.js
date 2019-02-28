const {News} = require('../model')
const {timeFormat} = require('../utils/time')

exports.addNews = async(ctx) => {
  const {title, content} = ctx.request.body
  let news = new News({
    title, content
  })
  await news.save()
  ctx.body = {code: 200}
}

exports.newsList = async(ctx) => {
  let {limit, page} = ctx.query
  if (limit) limit = Number(limit)
  const pageSize = limit || 0
  const currentPage = page
  const skipnum = (currentPage - 1) * pageSize
  let data = await News
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(pageSize)
  let total = await News.count()
  let flag = JSON.parse(JSON.stringify(data))
  flag.forEach((item, i) => {
    flag[i].date = timeFormat(item.date)
  })
  ctx.body = {code: 200, data: flag, total}
}

exports.delNews = async(ctx) => {
  const {_id} = ctx.query
  await News.remove({_id})
  ctx.body = {code: 200}
}