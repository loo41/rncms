const {ArticleType, Content, Article} = require('../model')
const {istoken} = require('../utils/token')

exports.addTypeLabel = async(ctx) => {
  const {type, name} = ctx.request.body
  let typeLabel = new ArticleType({type, name})
  await typeLabel.save()
  ctx.body = {code: 200}
}

exports.typeList = async(ctx) => {
  let type = await ArticleType.find({type: 'type'}).sort({_id: -1})
  let label = await ArticleType.find({type: 'label'}).sort({_id: -1})
  ctx.body = {code: 200, type, label}
}

exports.delType = async(ctx) => {
  const {_id} = ctx.query
  await ArticleType.remove({_id})
  ctx.body = {code: 200}
}

exports.upload = async(ctx) => {
  ctx.body = {code: 200, url: ctx.req.file.filename}
}

exports.addArticle = async(ctx) => {
  const {article} = ctx.request.body
  const {_id, editorContent, content, title, show, subTitle, keyword, summary, articleType, type, label} = article
  if (_id) {
    await Article.update({_id}, {$set: {
      title, subTitle, 
      summary, type, label, 
      show, articleType, keyword
    }})
    await Content.update({_id: content}, {$set: {content: editorContent}})
    ctx.body = {code: 200}
    return
  }
  let contentModel = new Content({content: editorContent})
  let user = await istoken(ctx)
  let id = contentModel._id
  let articleModel = new Article({
    title, subTitle, 
    summary, content: id, type,
    label, show, articleType, keyword,
    author: user._id
  })
  await contentModel.save()
  await articleModel.save()
  ctx.body = {code: 200}
}

exports.list = async(ctx) => {
  const {page} = ctx.query
  const pageSize = 10
  const currentPage = page
  const skipnum = (currentPage - 1) * pageSize
  let data = await Article
                        .find({})
                        .sort({_id: -1})
                        .skip(skipnum)
                        .limit(pageSize)
                        .populate({path: 'author', select: 'username'})
  let total = await Article.count()
  ctx.body = {code: 200, data, total}
}

exports.updateType = async(ctx) => {
  const {_id, articleType} = ctx.request.body
  await Article.update({_id}, {$set: {articleType}})
  ctx.body = {code: 200}
}


exports.updateShow = async(ctx) => {
  const {_id, show} = ctx.request.body
  await Article.update({_id}, {$set: {show}})
  ctx.body = {code: 200}
}

exports.getArticleContent = async(ctx) => {
  const {_id} = ctx.query
  let content = await Content.findOne({_id})
  await Content.update({_id}, { $inc: { visits: 1 } })
  ctx.body = {code: 200, content}
}

exports.delArticle = async(ctx) => {
  const {_id, contentId} = ctx.query
  await Article.remove({_id})
  await Content.remove({_id: contentId})
  ctx.body = {code: 200}
}

exports.article = async(ctx) => {
  let {type, limit, star, content, page} = ctx.query
  limit = Number(limit)
  star = Number(star)
  page = Number(page)
  if ((type === '' || !type) &&
      (limit == 0 || !limit) &&
      (star == 1 || !star) &&
      (content == 'false') && (page == 0 || !page)
    ) {
    let data = await Article.find({}).populate({path: 'author', select: 'username'})
    let total = await Article.count()
    ctx.body = {code: 200, data, total}
    return
  }
  const currentPage = page || 1
  const skipnum = (currentPage - 1) * limit
  let options = {}
  let data = []
  if (star === 2) {
    options.star = 2
  }
  if (type) {
    options.type = type
  }
  if (content == 'false' || !content) {
    if (limit) {
      data = await Article
        .find(options)
        .sort({_id: -1})
        .skip(skipnum)
        .limit(limit)
        .populate({path: 'author', select: 'username'})
    } else {
      data = await Article
        .find(options)
        .sort({_id: -1})
        .skip(skipnum)
        .populate({path: 'author', select: 'username'})
    }
  } else {
    if (limit) {
      data = await Article
        .find(options)
        .sort({_id: -1})
        .skip(skipnum)
        .limit(limit)
        .populate({path: 'author', select: 'username'})
        .populate('content')
    } else {
      data = await Article
        .find(options)
        .sort({_id: -1})
        .skip(skipnum)
        .populate({path: 'author', select: 'username'})
        .populate('content')
    }
  }
  let total = await Article.count()
  ctx.body = {code: 200, data, total}
}

exports.searchArticle = async(ctx) => {
  let {keyword} = ctx.query
  let reg = new RegExp(keyword, 'ig')
  let list = await Article.find({keyword: {$regex : reg}})
                          .populate({path: 'author', select: 'username'})
                          .populate('content')
  let total = await Article.count()
  ctx.body = {code: 200, list, total}
}