/**
 * @file: configuration for Theme
 * @author: Cuttle Cong
 * @date: 2017/11/23
 * @description:
 */

var moment = require('picidae/exports/moment')
var nps = require('path')

var autoKeyword = require('picidae-tool-auto-keyword')

module.exports = {
  root: './templates',

  routes: {
    path: '/',
    component: './Layout',
    indexRoute: {
      component: './Posts'
    },
    childRoutes: [{
        path: 'blog/:group/:name',
        component: './Article',
        data: {},
      },
      {
        path: 'jobs',
        component: './Jobs',
      },
      {
        path: 'about-us',
        component: './AboutUS',
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
      }
    ]
  },
  notFound: './NotFound',

  config: {
    title: '百度EUX',
    homeTitleDesc: '百度企业产品用户体验团队',

    comment: {
      use: 'valine',
      disqus: {
        host: 'www.abc.com',
        short: 'test'
      },
      valine: {
        notify: false,
        verify: false,
        appId: '4fCdqnlFElaTqy9miyFBgCqo-gzGzoHsz',
        appKey: 'VYh1hEgQTIFzEBD7DY5TqImM',
        placeholder: 'just go go',
        avatar: 'mm'
      }
    },
    defaultCover: 'http://eux.baidu.com/wp-content/themes/eux/images/no-thumbnail.png',
    pageSize: 12,
    menus: [{
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
    return autoKeyword(meta, gift)
      .then(function () {
        return meta
      });
  }
}