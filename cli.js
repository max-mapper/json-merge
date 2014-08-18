#!/usr/bin/env node

var merge = require('./')
var fs = require('fs')
var request = require('request')
var ldj = require('ldjson-stream')
var JSONStream = require('JSONStream')

run()

function run() {
  if (!process.argv[2] || !process.argv[3]) {
    var usage = 'Usage: json-merge <source1> [options] <source2> [options] [<source3>...]'
    usage += '\n\nOptions'
    usage += '\n--parse=<s>\t Parse the precedent source with <s>'
    console.error(usage)
  }

  var args = process.argv.splice(2).reduce(function (sources, current, cb) {
    if(current.match(/^--parse=/)) {
      sources.push({uri: sources.pop().uri, parse: current.substring(8)})
    } else {
      sources.push({uri: current})
    }
    return sources
  }, [])

  var streams = args.map(getStream);
  var merger = merge(streams)
  merger.pipe(ldj.serialize()).pipe(process.stdout)
}

function getStream(source) {
  var sourceStream
  var uri = source.uri

  if (uri.match(/^http\:\/\//)) {
    sourceStream = request(uri)
  } else if (fs.existsSync(uri)) {
    sourceStream = fs.createReadStream(uri)
  } else {
    return process.stdin.pipe(JSONStream.parse(uri))
  }

  if(source.parse) {
    return sourceStream.pipe(JSONStream.parse(source.parse))
  } else {
    return sourceStream.pipe(ldj.parse())
  }
}
