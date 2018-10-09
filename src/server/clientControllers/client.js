const {News, Article, Content} = require('../model')

exports.index = async(ctx) => {
  let article = await Article.find({show: true}).limit(5).sort({_id: -1})
  let news = await News.find({}).limit(1).sort({_id: -1})
  let articleList = await Article.find({show: true}).sort({_id: -1}).limit(10)
  await ctx.render('index', {
    article,
    news: news[0],
    articleList
  })
}

exports.content = async(ctx) => {
  let {_id} = ctx.query
  _id = _id.replace("\"","").replace("\"","")
  let content = await Content.findOne({_id})
  await ctx.render('content', {
    content
  })
}