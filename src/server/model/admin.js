const moogose = require('mongoose');
const Schema = moogose.Schema;


const AdminSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  power: Array,
  superAdmin: Boolean,
  effect: Boolean,
  receiveMail: Boolean
})

const Admin = moogose.model('admin', AdminSchema)

module.exports = Admin