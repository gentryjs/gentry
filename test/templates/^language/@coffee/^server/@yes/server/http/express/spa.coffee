app = require './'
config = require '../../config'
{join} = require 'path'
idxFile = join config.pubdir, 'index.html'

# serve spa
app.get '/*', (req, res) ->
  res.sendfile idxFile

module.exports = app
