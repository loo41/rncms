const fs = require('fs')
const {exec} = require('child_process')
const archiver = require('archiver')

const deleteFolder = async(path) => {
  return new Promise(async(resolve, reject) => {
    let files = [];
    if( fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      await files.forEach(function(file, index){
        let curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(path)
    }
    resolve()
  })
}

function zip(dbpath) {
  return new Promise((resolve, reject) => {
    let output = fs.createWriteStream(dbpath + '.zip')
    let archive = archiver('zip')
    output.on('close', function () {
      resolve()
    })
    output.on('end', function () {
      resolve()
    })
    archive.on('error', function (err) {
      reject()
    })
    archive.pipe(output)
    archive.directory(dbpath + '/', false)
    archive.finalize()
  })
}

function execFun (com) {
  return new Promise((resolve, reject) => {
    exec(com, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

module.exports = {
  deleteFolder,
  zip,
  execFun
}