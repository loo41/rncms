const moogose = require('mongoose');
const moment = require('moment');
const Schema = moogose.Schema;


const MessageSchema = new Schema({
  user: String,
  phone: String,
  content: String,
  date: {type: Date, default: Date.now},
})

MessageSchema.path('date').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss");
})

const Message = moogose.model('message', MessageSchema)

module.exports = Message