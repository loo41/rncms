const {PassRouter} = require('../src/server/model')
const {admin} = require('../config/setting')
const {router, updateRouter} = admin

async function init () {
  if (updateRouter) {
    await PassRouter.remove({})
    let pass = new PassRouter({router})
    await pass.save()
  } else {
    let passList = await PassRouter.find({})
    if (passList.length === 0) {
      let pass = new PassRouter({router})
      await pass.save()
    }
  }
}

module.exports = init