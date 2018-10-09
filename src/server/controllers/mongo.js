const {Mongo} = require('../model')
const {timeFormat} = require('../utils/time')
const {deleteFolder, zip, execFun} = require('../utils/file')
const path = require('path')
const fs = require('fs')
const {database} = require('../../../config/mongodb')

exports.dbList = async(ctx) => {
  const {page} = ctx.query
  const pageSize = 10
  const currentPage = page
  const skipnum = (currentPage - 1) * pageSize
  let data = await Mongo
                        .find({})
                        .sort({_id: -1})
                        .skip(skipnum)
                        .limit(pageSize)
  let total = await Mongo.count()
  let flagData = JSON.parse(JSON.stringify(data))
  flagData.forEach((item, i) => {
    flagData[i].date = timeFormat(item.date)
  })
  ctx.body = {code: 200, data: flagData, total}
}

exports.backups = async(ctx) => {
  const {host, db} = database
  let dbpathFolder = path.resolve(process.cwd(), 'databak')
  if (!fs.existsSync(dbpathFolder)) {
    fs.mkdirSync(dbpathFolder)
  }
  let dbFolder = String(Date.now())
  let dbpath = path.join(dbpathFolder, dbFolder)
  if (fs.existsSync(dbpath)) {

  } else {
    fs.mkdirSync(dbpath)
    await execFun(`mongodump -h ${host} -d ${db} -o ${dbpath}`)
    await zip(dbpath)
    let mongo = new Mongo({
      path: dbpath,
      filename: dbFolder + '.zip',
    })
    await mongo.save()
  }
  ctx.body = {code: 200}
}

exports.delectFile = async(ctx) => {
  const {path, _id} = ctx.request.body
  await deleteFolder(path)
  if (fs.existsSync(path + '.zip')) {
    await fs.unlinkSync(path + '.zip')
  }
  await Mongo.remove({_id})
  ctx.body = {code: 200}
}
