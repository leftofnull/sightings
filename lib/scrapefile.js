const request = require('request')
const fs = require('fs')

function scrapeFile(uri, fileTree, next) {
  request.get(uri, (err, data) => {
    let filename = fileTree.filename
    if (!fileTree.fullPath.endsWith('/')) filename = '/' + filename
    fs.writeFile(fileTree.fullPath + filename, 
      data.body, 
      err => {
        if (err) return next(err)
        console.log('wrote ' + fileTree.fullPath + filename)
        return next(null)
      })
  })
}

module.exports = scrapeFile