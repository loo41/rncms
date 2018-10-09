const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  * @param visits 浏览次数
 */

const ContentSchema = new Schema({
  content: String,
  visits: {type: Number, default: 0}
})

const Content = moogose.model('content', ContentSchema)

module.exports = Content