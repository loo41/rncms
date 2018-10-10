const Koa = require('koa')
const logger = require('koa-morgan')
const path = require('path')
const serve = require('koa-static')
const koaBody = require('koa-body')
const favicon = require('koa-favicon')
const schedule = require('node-schedule')
const render = require('koa-art-template')
const app = new Koa()
const router = require('./src/server/router')
const CONST = require('./config/const')

const cors = require(`${path.join(CONST.ROOT, 'middleware/cors')}`)
const authentication = require(`${path.join(CONST.ROOT, 'middleware/auth')}`)
const error = require(`${path.join(CONST.ROOT, 'middleware/error')}`)

// 连接数据库并初始化超级管理员
require(`${path.join(CONST.ROOT, 'middleware/mongodb')}`)(app)
// 初始化其他数据
require(`${path.join(CONST.ROOT, 'middleware/init')}`)()
if (process.env.SERVER === 'false') {
// 启动管理端服务
require(`${path.join(CONST.ROOT, 'build/dev-server.js')}`)(app)
}

render(app, {
  root: path.join(__dirname, 'src/client'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

schedule.scheduleJob('0 50 11 * * 7', function(){
  require(`${path.join(CONST.ROOT, 'middleware/backups')}`)()
})

app
  .use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))     // 请求日志
  .use(koaBody())
  .use(error())  // 错误统一处理
  .use(serve(path.join(__dirname, '/static')))
  .use(serve(path.join(__dirname, '/databak')))
  .use(favicon(__dirname + '/static/favicon.ico'))
  .use(cors(app)) // 跨域
  .use(authentication()) // 权限检测
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(__dirname, 'src/client')))

let port = process.env.PORT || 8080
app.listen(port, () => {
  if (process.env.SERVER === 'false') {
    console.log(`
    admin started at http://127.0.0.1:${port}
    webpack 构建中...
    `)
  }
  console.log(`
    client started at http://127.0.0.1:${port}/home
  `)
})

module.exports = app