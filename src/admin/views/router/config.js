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
    {key: 'home/user', title: '用户专栏', icon: 'user', 
      childrens: [
        {path: '/home/user/index', key: 'userManage', title: '用户管理', component: 'UserManage'},
        {path: '/home/user/message', key: 'userMes', title: '留言管理', component: 'UserMes'}
      ]
    },
    {key: 'home/images', title: '图片专栏', icon: 'ordered-list', 
      childrens: [
        {path: '/home/images/index', key: 'imagesManage', title: '图片管理', component: 'Images'},
        {path: '/home/images/add', key: 'addImages', title: '添加图片', component: 'AddImages'},
        {path: '/home/images/type', key: 'ImagesType', title: '图片类型', component: 'ImagesType'},
      ]
    },
    {key: 'home/article', title: '文章专栏', icon: 'ordered-list', 
      childrens: [
        {path: '/home/article/index', key: 'articleManage', title: '文章管理', component: 'Article'},
        {path: '/home/article/add', key: 'addArticle', title: '添加文章', component: 'AddArticle'},
        {path: '/home/article/type', key: 'articleType', title: '文章类型', component: 'ArticleType'},
      ]
    },
  ]
}