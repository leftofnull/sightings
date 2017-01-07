const fs = require('fs')

function writePage(fullPath, content, options, next) {
  if (typeof options !== 'object') {
    next = options
    options = undefined
  }

  if (options && options.replacements && options.replacements.length > 0) {
    options.replacements.forEach(r => {
      if (r.length === 2) content.replace(r[0], r[1])
    })
  }

  let file = 'index.html'
  if (!fullPath.endsWith('/')) file = '/' + file
  fs.writeFile(fullPath + file, content, err => {
    if (err) return next(err)
    console.log('wrote ' + fullPath + file)
    return next(null)
  })
}

module.exports = writePage