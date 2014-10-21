
module.exports = function(user) {
  var src = '(function() {\n';
  if (user != null) {
    var serialized = JSON.stringify(user, null, 2);
    src += 'var out = new User(' + serialized + ');\n';
    src += 'return out;\n';
  } else {
    src += 'return;\n';
  }
  src += '}).call(this);';
  return src;
};
