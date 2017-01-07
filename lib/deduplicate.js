function deduplicate(arr) {
  let set = new Set(arr)
  return (Array.from(set.values()))
}

module.exports = deduplicate
