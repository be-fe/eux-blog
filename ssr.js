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

module.exports.externals = 'react-document-title'

// curl -X POST \
//   -F token=5aa7cd42d4ceaa45a72adebb35ef70 \
//   -F ref=master \
//   http://gitlab.baidu.com/api/v4/projects/31182/trigger/pipeline
