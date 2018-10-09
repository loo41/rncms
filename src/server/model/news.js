const moogose = require('mongoose');
const Schema = moogose.Schema;

const NewsSchema = new Schema({
  title: String,
  date: {type: Date, default: Date.now},
  content: String
})

const News = moogose.model('news', NewsSchema)

module.exports = News