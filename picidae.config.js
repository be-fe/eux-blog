/**
 * @file: picidae.config.js
 * @author: Cuttle Cong
 * @date: 2017/11/23
 * @description:
 */
var nps = require('path')

module.exports = {
  docRoot: './doc',
  theme: './theme',
  // publicPath: '/eux-blog/',
  // @todo
  host: 'http://eux.baidu.com/',
  verbose: true,
  webpackConfigUpdater: function (config) {
    // config.module.loaders[2].include = [/\/node_modules\/picidae\//, nps.join(__dirname, '..')]
    config.module.loaders[2].exclude = [
      function (name) {
        return !/\/picidae-(plugin|transformer|theme|commander)/.test(name)
               && !/(node_modules|bower_components)\/picidae/.test(name)
               && /(node_modules|bower_components)/.test(name)
      },
      /\/node_modules\/(core-js|babel-runtime)\//
    ]
    return config
  },

  distRoot: './public',

  // templateData(gift) {
  //   console.log('templateData', gift)
  //   return Promise.resolve({
  //     gift
  //   })
  // }
  port: 10000,

  transformers: [
    // 'picidae-transformer-medium-image?' + JSON.stringify({
    //   sizeOptions: {
    //     debug: false
    //   },
    //   progressive: {
    //     sizeOptions: { debug: true, devEnable: false },
    //     progressImageUrlGetter: function(url) {
    //       var obj = require('url').parse(url)
    //       if (obj.hostname === 'eux-blog-static.bj.bcebos.com') {
    //         obj.pathname = obj.pathname += '@s_0,h_30,l_1,f_jpg,q_50'
    //         var newUrl = require('url').format(obj)
    //         return newUrl
    //       }
    //       var q = String.fromCharCode(63)
    //       return 'http://23.106.151.229:8000/resize/' + encodeURIComponent(url) + q + 's=0.1'
    //     }.toString()
    //   }
    // })
  ]
}