function fileTree(targetDirectory, filePath) {
  let parts = filePath.split('/').splice(1),
      file = parts.splice(- 1)[0],
      dirs = parts.join('/')
      fullPath = targetDirectory + '/' + dirs

  if (fullPath.indexOf('//') === 0) fullPath.substr(1)
  if (file.indexOf('?') > -1) file = file.substring(0, file.indexOf('?'))
  return {
    filename: file,
    fullPath: fullPath
  }
}

module.exports = fileTree