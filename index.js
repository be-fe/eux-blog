/**
 * @file: configuration for Theme
 * @author: Cuttle Cong
 * @date: 2017/11/23
 * @description:
 */

var moment = require('picidae/exports/moment')
var nps = require('path')

module.exports = {
  root: './templates',

  routes: {
    path: '/',
    component: './Layout',
    indexRoute: {
      component: './Posts'
    },
    childRoutes: [
      {
        path: 'blog/:group/:name',
        component: './Article',
        data: {},
      },
      {
        path: ':menu(/page/:pageNum)',
        component: './Posts',
        data: {
          className: 'container-singular'
        },
      },
      {
        path: '/(page/:pageNum)',
        component: './Posts',
        data: {
          className: 'container-singular'
        },
      },
    ]
  },
  notFound: './NotFound',

  config: {
    defaultCover: 'http://eux.baidu.com/wp-content/themes/eux/images/no-thumbnail.png',
    pageSize: 12,
    menus: [
      {
        label: '全部',
        path: '/'
      },
      {
        label: '交互',
        path: 'ue'
      },
      {
        label: '视觉',
        path: 'ui'
      },
      {
        label: '前端',
        path: 'fe'
      },
      {
        label: '团队',
        path: 'team'
      }
    ],
    routesMap(path) {
      // console.log(path)
      return nps.join('blog', path)
    }
  },
  picker(meta, gift, require) {
    if (!meta.author) {
      meta.author = 'anonymity'
    }
    return meta;
  }
}