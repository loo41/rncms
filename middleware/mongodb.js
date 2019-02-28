const mongoose = require('mongoose');
const colors = require('colors');
const path = require('path');
const serverConfig = require(path.resolve(`${process.cwd()}`, 'config/mongodb.js'));
const {Admin} = require('../src/server/model')

async function connectMongodb () {
  // https://mongoosejs.com/docs/connections.html
  
  const options = {
    useNewUrlParser: true
  }
  const [user, pass, host, port, db] = [
    serverConfig.database.user,
    serverConfig.database.pass,
    serverConfig.database.host,
    serverConfig.database.port,
    serverConfig.database.db]
    let uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`
    await mongoConnection(uri, options)
    await initSpuer()
}

function initSpuer() {
  return new Promise(async (resolve, reject) => {
    const {superUsername, superPassword, email, phone} = serverConfig.database
    let superAdmin = await Admin.find({username: superUsername})
    if (superAdmin.length === 0) {
      let user = new Admin({
        username: superUsername,
        password: superPassword,
        power: [],
        email,
        phone,
        superAdmin: true,
        effect: true,
        receiveMail: true
      })
      await user.save()
    } else {
      resolve()
    }
   })
}

function mongoConnection(uri, options) {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri, options).then(
      () => {
        console.log('数据库连接成功'.green)
        resolve()
      },
      err => {
        console.log(`数据库连接失败\n${err}`.red)
        process.exit(1)
        reject(err)
      }
    );
  })
}

module.exports = connectMongodb