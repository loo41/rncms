const moogose = require('mongoose');
const Schema = moogose.Schema;


const PassRouterSchema = new Schema({
  router: Array
})

const PassRouter = moogose.model('passRouter', PassRouterSchema)

module.exports = PassRouter