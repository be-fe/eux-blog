/**
 * @file: picidae.config.js
 * @author: Cuttle Cong
 * @date: 2017/11/23
 * @description:
 */
var nps = require('path')

module.exports = {
  docRoot: './doc',
  theme: '../',
  publicPath: '/picidae-theme-eux-blog/',
  verbose: false,
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

  distRoot: '../public'

  // templateData(gift) {
  //   console.log('templateData', gift)
  //   return Promise.resolve({
  //     gift
  //   })
  // }
}