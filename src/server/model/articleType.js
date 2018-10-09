const moogose = require('mongoose');
const Schema = moogose.Schema;

const ArticleTypeSchema = new Schema({
  type: String,
  name: String
})

const ArticleType = moogose.model('articleType', ArticleTypeSchema)

module.exports = ArticleType