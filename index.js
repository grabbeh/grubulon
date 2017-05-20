#!/usr/bin/env node

const cli = require('commander')
const glob = require('glob')
const loop = require('node-async-loop')
const _ = require('lodash')
const options = {}
const arr = []

cli
  .version('0.0.1')
  .usage('[options] files')
  .option('-f, --full', 'Full output without any styling')
  .parse(process.argv)

loop(cli.args, expand, function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    var allFiles = _.flatten(arr)
    return allFiles
    process.exit(0)
  }
})

function expand (file, next) {
  glob(file, options, function (err, files) {
    if (err) {
      next(err)
      return
    }
    arr.push(files)
    next()
  })
}
