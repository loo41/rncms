export const article = {
  addTypeLabel: { api: '/addArticleTypeLabel', des: '添加文章类型和标签'},
  articleTypeList: {api: '/articleTypeList', des: '文章类型标签列表'},
  delectArticle: {api: '/delectArticle', des: '删除文章类型标签'},
  addArticle: {api: '/addArticle', des: '添加文章与更新文章'},
  articleList: {api: '/articleList', des: '文章列表'},
  updateType: {api: '/updateType', des: '更新文章类型'},
  updateShow: {api: '/updateShow', des: '更新发布状态'},
  getArticleContent: {api: '/getArticleContent', des: '获取文章对应内容'},
  delArticle: {api: '/delArticle', des: '获取文章对应内容'},
  getJson: {api: '/article', des: '获取文章数据'},
  getSearchJson: {api: '/searchArticle', des: '关键字文章查询'}
}
export const backup = {
  backupsList: {api: '/backupsList', des: '备份列表'},
  backups: {api: '/backups',des: '备份'},
  delFile: {api: '/delectFile',des: '删除备份'}
}

export const admin = {
  addUser: {api: '/addUser', des: '添加管理员'},
  userList: {api: '/userList', des: '管理员列表'},
  delAdmin: {api: '/delectAdmin', des: '删除管理员'},
  upAdmin: {api: '/updateUser', des: '更新管理员信息'}
}

export const power = {
  powerList: {api: '/powerList', des: '权限列表'},
  setPower: {api: '/setPower', des: '设置权限'}
}

export const index = {
  login: {api: '/login', des: '登陆'},
  checkPower: {api: '/checkPower', des: '检测权限'},
  upload: {api: '/manage/upload', des: '文件上传'},
  home: {api: '/homeData', des: '首页数据'},
  baseData: {api: '/baseData', des: '基本数据'}
}

export const log = {
  log: {api: '/logList', des: '获取日志列表'},
  delLog: {api: '/delLog', des: '删除日志'}
}

export const news = {
  addNews: {api: '/addNews', des: '添加公告'},
  getNewsList: {api: '/newsList', des: '公告列表'},
  delNews: {api: '/delNews', des: '删除公告'}
}

export const user = {
  delectUser: {api: '/delect', des: '删除用户'},
  searchUser: {api: '/search', des: '查找用户'},
  userList: {api: '/users', des: '用户列表'},
  addUser: {api: '/user', des: '添加用户'},
  getMessage: {api: '/message', des: '用户消息管理'},
}

export const images = {
  addImageTypeLabel: {api: '/image-label', des: '添加图片标签'},
  ImageLabelList: {api: '/image-label-list', des: '图片标签列表'},
  delectImageLable: {api: '/img-label', des: '删除图片标签'},
  imageUpload: {api: './image-upload', des: '图片内容上传'},
  imageList: {api: './image-list', des: '图片列表'},
  delImage: {api: './del-image', des: '删除图片数据'}
}

export const addApi = Object.assign({}, article, backup, admin, user, index, power, log, news, images)