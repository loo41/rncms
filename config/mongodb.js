/**
 * @param database 数据库数据 *
 * @param database.superUsername  超级管理员账号 *
 * @param database.superPassword  超级管理员密码 *
 * @param notCheck 不检查权限的路由
 * 
 * 
 */

module.exports = {
  database: {
    user: '',
    pass: '',
    host: '127.0.0.1',
    port: '27017',
    db: 'rncms',
    superUsername: 'rncms',
    superPassword: 'koa2cms',
    email: '1805170243@qq.com',
    phone: '17320098939'
  }
}