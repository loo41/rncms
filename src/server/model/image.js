const moogose = require('mongoose');
const Schema = moogose.Schema;

/**
 *  * @param label 类型标签
 *  * @param type 类型 《主图<1> || 产品<2> || 生产基地<3>》
 *  * @param images 图片地址
 */

const ImageSchema = new Schema({
  title: String,
  label: String,
  type: Number,
  banner: String
})

const Image = moogose.model('image', ImageSchema)

module.exports = Image