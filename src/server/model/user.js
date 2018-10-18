const moogose = require('mongoose');
const Schema = moogose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  head_thumb: {type: String, default: ''},
  email: {type: String, default: ''},
  phone: {type: String, default: ''},
  sex: {type: Number, default: ''}, // 1为男 2为女 空不存在
  collect: {type: Array, default: []}
})

const User = moogose.model('user', userSchema)

module.exports = User