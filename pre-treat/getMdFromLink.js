#!/usr/bin/env node
/**
 * @file: getMdFromLink
 * @author: Cuttle Cong
 * @date: 2017/11/25
 * @description:
 */

var http = require('http')
var https = require('https')
var url = require('url')
var fs = require('fs')
var nps = require('path')
var readline = require('readline')

var moment = require('picidae/exports/moment')
var html2MD = require('html-markdown')
var cheerio = require('cheerio')
var del = require('del')
var mkdirp = require('mkdirp')

var get = require('./lib/request')

var mdRoot = nps.join(__dirname, 'md')

var rl = readline.createInterface({
  input: fs.createReadStream(nps.join(__dirname, 'links.txt')),
});

rl.on('line', function (line) {
  var rec = JSON.parse(line)
  var link = rec.link
  get(link)
    .then(function (body) {
      var data = calcBlogHtml2MD(body.toString(), rec.data);

      var keyName = decodeURIComponent(nps.basename(link))
      writeMD(data.markdown, nps.join(data.data.menu, keyName));
    })
    .catch(console.error)
});


del.sync([nps.join(mdRoot, '*')], {force: true})
function writeMD(md, key) {
  console.log('writing ', key)
  var path = nps.join(mdRoot, key + '.md')
  mkdirp.sync(nps.dirname(path))
  fs.writeFileSync(
    path,
    md
  )
}

function calcBlogHtml2MD(html, data) {
  var $ = cheerio.load(html)

  var menuHref = $('li.current-menu-parent.current-post-parent').find('a').attr('href')
  var menu = nps.basename(menuHref)

  var $inner = $('.inner.clearfix')

  var title = $inner.children('h1').first().remove().text()

  var $meta = $inner.children('.eux-page-detail').remove()
  var $metaspan = $meta.children('span')
  $metaspan.eq(0).find('em').remove()
  var author = $metaspan.eq(0).text()
  var date = $metaspan.eq(1).text()
  date = moment(new Date(date)).format('YYYY-MM-DD hh:mm:ss')

  var dataList = []
  Object.keys(data).forEach(function (key) {
    dataList.push(key + ': ' + JSON.stringify(data[key]))
  })

  $inner.find('.eux-like, .single-bar').remove();

  var markdown = [
      '---',
      'title: ' + JSON.stringify(title),
      'author: ' + JSON.stringify(author),
      'datetime: ' + date
    ]
    .concat(dataList)
    .concat([
      '---',
      '',
      html2MD.html2mdFromString($inner.html()),
    ]).join('\n')

  return {
    markdown: markdown,
    data: {
      menu: menu
    }
  }
}

