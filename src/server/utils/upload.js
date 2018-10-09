const multer = require('koa-multer')
const path = require('path')
 
const storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, path.join(process.cwd(), 'static'))
  },   
  filename: async function (req, file, cb) {
    const {type} = req.body
    let fileFormat = (file.originalname).split(".")  
    cb(null, Date.now() + 'rncms' +"." + fileFormat[fileFormat.length - 1])
  }  
})  
const upload = multer({ storage: storage })


module.exports = {
  upload
}