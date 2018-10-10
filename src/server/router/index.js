const Router = require('koa-router');
const controller = require('../controllers');
const clientCon = require('../clientControllers');

const router = new Router({
  prefix: '/'
})

/**
 * @author loo4p
 * @extends rncms
 */

const { Admin, Backups, Article, Power, Log, News } = controller
const { upload } = require('../utils/upload')

router
    .post(`login`, Admin.login)
    .post(`addUser`, Admin.addUser)
    .get(`userList`, Admin.list)
    .get(`delectAdmin`, Admin.remove)
    .post(`updateUser`, Admin.updateUser)
    .get(`backupsList`, Backups.dbList)
    .get(`backups`, Backups.backups)
    .get('checkPower', Admin.checkPower)
    .post('delectFile', Backups.delectFile)
    .post(`addArticleTypeLabel`, Article.addTypeLabel)
    .get(`articleTypeList`, Article.typeList)
    .get(`delectArticle`, Article.delType)
    .get(`powerList`, Power.list)
    .put('setPower', Power.setPower)
    .post(`addArticle`, Article.addArticle)
    .post(`upload`, upload.single('article'), Article.upload)
    .get(`articleList`, Article.list)
    .post(`updateType`, Article.updateType)
    .post(`updateShow`, Article.updateShow)
    .get(`getArticleContent`, Article.getArticleContent)
    .get(`delArticle`, Article.delArticle)
    .get(`article`, Article.article)
    .get(`searchArticle`, Article.searchArticle)
    .get(`logList`, Log.logList)
    .get(`delLog`, Log.delLog)
    .post(`addNews`, News.addNews)
    .get(`newsList`, News.newsList)
    .get(`delNews`, News.delNews)
    .get(`homeData`, Admin.homeData)


  
/**
 * 前端
 */

const {Client} = clientCon

router
    .get(`home`, Client.index)
    .get(`content`, Client.content)


if (process.env.SERVER === 'true') {
router
    .get(``, Client.index)
}


module.exports = router