// var through = require('through2')
var merge = require('merge-object-streams')

module.exports = function(streams) {
  return new merge(streams)
}
