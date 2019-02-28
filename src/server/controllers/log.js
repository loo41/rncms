const {Log} = require('../model')
const {timeFormat} = require('../utils/time')

exports.logList = async(ctx) => {
  const {page} = ctx.query
  const pageSize = 10
  const currentPage = page
  const skipnum = (currentPage - 1) * pageSize
  let data = await Log
                      .find({})
                      .sort({_id: -1})
                      .skip(skipnum)
                      .limit(pageSize)
  let flagData = JSON.parse(JSON.stringify(data))
  flagData.forEach((item, i) => {
    flagData[i].date = timeFormat(item.date)
  })
  let total = await Log.count()
  ctx.body = {code: 200, data: flagData, total}
}

exports.delLog = async(ctx) => {
  const {_id} = ctx.query
  await Log.remove({_id})
  ctx.body = {code: 200}
}