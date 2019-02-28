const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 * 
 * @param user 提问人
 * @param replyState 回复的状态
 * @param issue      提出的问题
 * @param replyContent 回复的内容
 * @param article  提出问题的文章
 * @param author  回复的管理员
 * @param viewState 消息的查看状态
 * 
 */

const replySchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user', index: true},
  replyState: {type: Boolean, default: false},
  issue: String,
  replyContent: {type: String, default: ''},
  article : {type: Schema.Types.ObjectId, ref: 'article'},
  admin: {type: Schema.Types.ObjectId, ref: 'admin'},
  date: {type: Date, default: Date.now},
  viewState: {type: Boolean, default: false}
})

const Reply = moogose.model('reply', replySchema)

module.exports = Reply