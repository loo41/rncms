module.exports = {
  // 管理端
  /**
   * 
   * @param router 初始化不检测权限路由
   * @param updateRouter 是否更新数据库不检测权限路由
   * @param alias admin webpack alias
   * @param baseURL admin 基础请求url
   * @param clientUrl 前端地址 展示在管理界面首页
   * 
   */
  admin: {
    router: ['/login', '/userList', 
      '/backupsList', '/articleList', 
      '/articleTypeList', '/powerList',
      '/homeData', '/logList', '/newsList',
      '/getArticleContent', '/upload', '/manage/upload', '/users/'],
    updateRouter: false,               /** 切记设置为true后保存重启完成后设置回flase  */
    alias: {},
    baseURL: 'http://127.0.0.1:' + (process.env.PORT || 8080), // http://127.0.0.1:' + (process.env.PORT || 8080)
    github: 'https://github.com/loo41/rncms',
    clientUrl: 'https://github.com/loo41'
  },
  server: {
    cors: false,     // 设置生产环境下是否允许跨域
    mailInfo: {          // 发送邮件配置 更多内容在../src/server/utils/mail
      user: '',
      pass: '',
      host: ''
    }
  }
}