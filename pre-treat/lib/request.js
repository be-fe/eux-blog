/**
 * @file: request
 * @author: Cuttle Cong
 * @date: 2017/11/25
 * @description:
 */

var http = require('http')
var https = require('https')
var url = require('url')
var concat = require('concat-stream')

function get(href) {
  return new Promise(function (resolve, reject) {
    var opts = url.parse(href)
    var pkg
    switch (opts.protocol) {
      case 'http:':
        pkg = http
        break
      case 'https:':
        pkg= https
        break
      default:
        throw new Error(href + ' is not supported')
    }

    pkg.request(
      opts,
      function (response) {
        response.pipe(
            concat(function (body) {
              resolve(body)
            })
          )
          .on('error', reject)
      })
      .on('error', reject)
      .end()
  })
}

module.exports = get