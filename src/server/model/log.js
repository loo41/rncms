const moogose = require('mongoose');
const Schema = moogose.Schema;

const LogTypeSchema = new Schema({
  type: Number,  // 1是错误 2 是正常
  date: {type: Date, default: Date.now},
  des: String,
  logs: String
})

const Log = moogose.model('log', LogTypeSchema)

module.exports = Log