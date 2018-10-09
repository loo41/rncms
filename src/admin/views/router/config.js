export default {
  menus: [
    {key: 'home', path: '/home/index', title: '主页', icon: 'home', component: 'Index'},
    {key: 'home/set', title: '系统设置', icon: 'setting', 
      childrens: [
        {path: '/home/set/log', key: 'log', title: '日志', component: 'Log'},
        {path: '/home/set/power', key: 'power', title: '权限', component: 'Power'},
        {path: '/home/set/admin', key: 'admin', title: '管理员', component: 'Admin'},
        {path: '/home/set/backups', key: 'backups', title: '备份导出', component: 'Backups'},
        {path: '/home/set/news', key: 'news', title: '系统消息', component: 'News'}
      ]
    },
    {key: 'home/article', title: '文章专栏', icon: 'ordered-list', 
      childrens: [
        {path: '/home/article/index', key: 'articleManage', title: '文章管理', component: 'Article'},
        {path: '/home/article/add', key: 'addArticle', title: '添加文章', component: 'AddArticle'},
        {path: '/home/article/type', key: 'articleType', title: '文章类型', component: 'ArticleType'},
        {path: '/home/article/api', key: 'articleApi', title: 'API数据', component: 'ArticleApi'}
      ]
    },
  ]
}