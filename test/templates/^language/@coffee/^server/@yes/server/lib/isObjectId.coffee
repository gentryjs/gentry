checkForHexRegExp = /^[0-9a-fA-F]{24}$/

module.exports = (v) ->
  return false unless typeof v is 'string'
  return false unless v.length is 24
  return checkForHexRegExp.test v
