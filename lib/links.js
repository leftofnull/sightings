const linkRegex = /((src="\S*")|(href="\S*"))/g

function shouldFollow(root, link) {
  return (link &&
    link !== root &&
    link !== root + '/' &&
    // link.indexOf('rss') < 0 &&
    link.indexOf('tag') < 0 &&
    link.indexOf('//') !== 0 &&
    link.indexOf('/') === 0)
}

function findLinks(url, body) {
  let links = [],
      m
  while ((m = linkRegex.exec(body)) !== null) {
    if (m.index === linkRegex.lastIndex) linkRegex.lastIndex++
    m.forEach((match) => {
      if (match) {
        let formatted = match.replace(
          new RegExp('src="', 'g'), '').replace(
          new RegExp('href="', 'g'), '').replace(
          new RegExp('"', 'g'), '')
        if (shouldFollow(url, formatted)) links.push(formatted)
      }
    })
  }

  return links
}

module.exports = findLinks
