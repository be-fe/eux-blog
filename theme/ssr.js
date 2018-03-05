/**
 * @file: configuration for Theme
 * @author: Cuttle Cong
 * @date: 2017/11/23
 * @description:
 */
var documentTitle = require('react-document-title')

module.exports = function (gift) {
  var themeConfig = gift.themeConfig
  var title = documentTitle.rewind()

  // if (title) {
  //   title = [title, themeConfig.title || 'EUX'].join(' - ')
  // }
  return {
    title: title,
  }
}

// module.exports.externals = 'react-document-title'
