const mkdirp = require('mkdirp')
const scrape = require('./lib/scrape')
const scrapeFile = require('./lib/scrapefile')
const fileTree = require('./lib/filetree')
const writePage = require('./lib/writepage')

function scrapeFiles (output, links, next) {
  if (!links || !links.length) return next(null)
  links.forEach((l, i) => {
    if (visited.indexOf(l) === -1) {
      visited.push(l)
      let tree = fileTree(output, l)
      mkdirp(tree.fullPath, err => {
        if (err) return next(err)
        scrapeFile(rootUri + l, tree, (err) => {
          if (err) return next(err)
          if (i == links.length - 1) return next(null)
        })
      })
    }
  })
}

function scrapePages (links, next) {
  if (!links || !links.length) return next(null)
  links.forEach((l, i) => {
    if (visited.indexOf(l) === -1) {
      visited.push(l)
      console.log('scraping pages', rootUri + l)
      scrape(rootUri + l, handle)
    }
  })
}

function handle(err, currentUri, data) {
  if (err) throw err

  let currentPath = currentUri.replace(rootUri, ''),
      pageOptions = {
          replacements: [
            [rootUri, targetUri]
          ]
        }

  if (!currentPath || currentPath === '/') currentPath = destinationDirectory
  if (currentPath.indexOf(destinationDirectory) === -1) 
    currentPath = destinationDirectory + currentPath

  mkdirp(currentPath, err => {
    writePage(currentPath, data.body, pageOptions, err => {
      if (err) throw err
      scrapeFiles(destinationDirectory, data.links.content, err => {
        if (err) throw err
        scrapeFiles(destinationDirectory, data.links.asset, err => {
          if (err) throw err
          scrapePages(data.links.page, handle)
        })
      })
    })
  })
}

let rootUri = process.argv[2],
    targetUri = process.argv[3],
    destinationDirectory = process.argv[4],
    visited = []

console.log('Scraping ' + rootUri)
console.log('Writing to ' + destinationDirectory)
scrape(rootUri, handle)
