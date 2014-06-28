#!/usr/bin/env node

var merge = require('./')
var fs = require('fs')
var request = require('request')
var ldj = require('ldjson-stream')
var JSONStream = require('JSONStream')

run()

function run() {
  if (!process.argv[2] || !process.argv[3])
    return console.error('Usage: json-merge <source1> <source2> [<source3>...]')
  var streams = process.argv.splice(2).map(getStream);
  var merger = merge(streams)
  merger.pipe(ldj.serialize()).pipe(process.stdout)
}

function getStream(uri) {
  if (uri.match(/^http\:\/\//)) {
    return request(uri).pipe(ldj.parse())
  } else if (fs.existsSync(uri)) {
    return fs.createReadStream(uri).pipe(ldj.parse())
  } else {
    return process.stdin.pipe(JSONStream.parse(uri))
  }
}
