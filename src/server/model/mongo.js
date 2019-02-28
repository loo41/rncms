const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


const MongoSchema = new Schema({
  path: String,
  filename: String,
  date: {type: Date, default: Date.now},
})

MongoSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})

const Mongo = moogose.model('mongo', MongoSchema)

module.exports = Mongo