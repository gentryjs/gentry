var checkForHexRegExp = /^[0-9a-fA-F]{24}$/;

module.exports = function(v) {
  if (typeof v !== 'string') {
    return false;
  }
  if (v.length !== 24) {
    return false;
  }
  return checkForHexRegExp.test(v);
};
