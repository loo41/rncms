const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


/**
 * 
 * @param title 标题
 * @param masterGraph 主图
 * @param subTitle 副标题
 * @param summary 简介
 * @param time 生成时间
 * @param content 内容外键
 * @param type 类别
 * @param label 标签
 * @param keyword 关键字
 * @param articleType 文档类型
 * @param show 展示
 * 
*/

const ArticleSchema = new Schema({
  title: String,
  subTitle: String,
  // masterGraph: String,
  summary: String,
  date: {type: Date, default: Date.now},
  content: {type: Schema.Types.ObjectId, ref: 'content'},
  type: String,
  label: String,
  show: Boolean,
  articleType: {type: Number, index: true},
  keyword: {type: Array, default: Array, index: true},
  author: {type: Schema.Types.ObjectId, ref: 'admin'},
})

const Article = moogose.model('article', ArticleSchema)

module.exports = Article