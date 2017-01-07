const request = require('request')
const deduplicate = require('./deduplicate')
const findLinks = require('./links')

function scrape(url, next) {
  request.get(url, (err, content) => {
    if (err) return next(err)

    let links = deduplicate(findLinks(url, content.body)),
        assets = [],
        contents = [],
        pages = []
    links.forEach(l => {
      if (l.indexOf('assets') > -1) assets.push(l)
      else if (l.indexOf('content') > -1 || l.indexOf('.ico') > -1 || l.indexOf('rss') > -1)
        contents.push(l)
      else pages.push(l)
    })

    next(null, url, {
      body: content.body,
      links: {
        content: contents,
        asset: assets,
        page: pages
      }
    })
  })
}

module.exports = scrape
