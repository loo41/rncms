const {Mongo, Log} = require('../src/server/model')
const {database} = require('../config/mongodb')
const path = require('path')
const {zip, execFun} = require('../src/server/utils/file')

module.exports = async () => {
  const {host, db} = database
  let dbpathFolder = path.resolve(process.cwd(), 'databak')
  let dbFolder = String(Date.now())
  let dbpath = path.join(dbpathFolder, dbFolder)
  await execFun(`mongodump -h ${host} -d ${db} -o ${dbpath}`)
  await zip(dbpath)
  let mongo = new Mongo({
    path: dbpath,
    filename: dbFolder + '.zip',
  })
  await mongo.save()
  console.log('备份成功')
  let err = new Log({
    type: 2,
    des: '备份成功',
    logs: '备份成功'
  })
  await err.save()
}