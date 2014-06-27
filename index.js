// var through = require('through2')
var merge = require('merge-object-streams')

module.exports = function(first, second) {
  return new merge([first, second])
}
