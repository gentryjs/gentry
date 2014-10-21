var app = require('./');
var config = require('../../config');
var join = require('path').join;
var idxFile = join(config.pubdir, 'index.html');
app.get('/*', function(req, res) {
  return res.sendfile(idxFile);
});

module.exports = app;
