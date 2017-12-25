#!/usr/bin/env node
/**
 * @file: getBlogLinks
 * @author: Cuttle Cong
 * @date: 2017/11/25
 * @description:
 */

var http = require('http')
var https = require('https')
var url = require('url')
var nps = require('path')

var cheerio = require('cheerio')

var get = require('./lib/request')

var BLOG_HOST = 'http://eux.baidu.com/'

getLinksFromURL(BLOG_HOST)
  .then(function (links) {
    console.log(JSON.stringify(links))
  }, console.error)

function getLinksFromURL(href) {
  if (!href) {
    return Promise.resolve([])
  }
  // console.log('getLinksFromURL', href)
  return get(href)
    .then(function (body) {
      return getLinks(body.toString(), href)
    })
}


function getLinks(html, origin) {
  var $ = cheerio.load(html)
  var $inner = $('.inner.clearfix')
  var $next = $('.page-bar a.next')
  var $cards = $inner.find('.eux-card')

  var nextHref = $next.attr('href')
  if (nextHref) {
    nextHref = url.resolve(origin, nextHref)
  }

  var links = []
  $cards.map(function () {
    var href = $(this).find('.eux-card-thumbnail a').attr('href')
    var thumbnail = $(this).find('.eux-card-thumbnail img').attr('src')
    var menu = nps.basename($(this).find('footer .eux-card-category a').attr('href'))
    links.push({
      link: url.resolve(origin, href),
      menu: menu,
      data: { cover: thumbnail }
    })
  })

  return getLinksFromURL(nextHref)
    .then(function (nextLinks) {
      return links.concat(nextLinks)
    })
}