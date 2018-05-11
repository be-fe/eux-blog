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
    homeTitleDesc: '百度企业产品用户体验中心',

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
    defaultCover: '/images/no-thumbnail.png',
    pageSize: 12,
    jobs: [
      {
        title: '交互',
        imgSrc: '/images/jobs/Interaction-right.png',
        content: ['能用线框构建世界', '能专注逻辑且准确拿捏用户喜好']
      }, {
        title: '视觉',
        imgSrc: '/images/jobs/vision-right.png',
        content: ['把每一个像素点都做到极致', '每一次产出都当作是完美表演']
      }, {
        title: '前端',
        imgSrc: '/images/jobs/fe-right.png',
        content: ['...', '...']
      }
    ],
    ours: [
      [
        {name:'郭思佳' , url: `%E9%83%AD%E6%80%9D%E4%BD%B31.jpg`, hoverUrl: `%E9%83%AD%E6%80%9D%E4%BD%B32.jpg`},
        {name:'胡佳妮' , url: `%E8%83%A1%E4%BD%B3%E5%A6%AE1.jpg`, hoverUrl: `%E8%83%A1%E4%BD%B3%E5%A6%AE2.jpg`}
      ],
      {name:'刘卉' , url: `%E5%88%98%E5%8D%891.jpg`, hoverUrl: `%E5%88%98%E5%8D%892.jpg`},
      {name:'吴俊' , url: `%E5%90%B4%E4%BF%8A.jpg`, hoverUrl: ''},
      {name:'赵蕊' , url: `%E8%B5%B5%E8%95%8A1.jpg`, hoverUrl: `%E8%B5%B5%E8%95%8A2.jpg`},
      {name:'唐婉琪' , url: `%E5%94%90%E5%A9%89%E9%AA%901.jpg`, hoverUrl: `%E5%94%90%E5%A9%89%E9%AA%902.jpg`},
      {name:'国悦婷' , url: `%E5%9B%BD%E6%82%A6%E5%A9%B7.jpg`, hoverUrl: ``},
      {name:'empty-item' , url: '', hoverUrl: ''},
      {name:'孙甜甜' , url: `%E5%AD%99%E7%94%9C%E7%94%9C1.jpg`, hoverUrl: `%E5%AD%99%E7%94%9C%E7%94%9C2.jpg`},
      {name:'尤足强' , url: `%E5%B0%A4%E8%B6%B3%E5%BC%BA1.jpg`, hoverUrl: `%E5%B0%A4%E8%B6%B3%E5%BC%BA2.jpg`},
      {name:'康佳美' , url: `%E5%BA%B7%E4%BD%B3%E7%BE%8E1.jpg`, hoverUrl: `%E5%BA%B7%E4%BD%B3%E7%BE%8E2.jpg`},
      [
        {name:'孙慧扬' , url: `%E5%AD%99%E6%85%A7%E6%89%AC1.jpg`, hoverUrl: `%E5%AD%99%E6%85%A7%E6%89%AC2.jpg`},
        {name:'花云' , url: `%E8%8A%B1%E4%BA%911.jpg`, hoverUrl: `%E8%8A%B1%E4%BA%912.jpg`}
      ],
      {name:'张超' , url: `%E5%BC%A0%E8%B6%851.jpg`, hoverUrl: `%E5%BC%A0%E8%B6%852.jpg`},
      [
        {name:'费千哲' , url: `%E8%B4%B9%E5%8D%83%E5%93%B21.jpg`, hoverUrl: `%E8%B4%B9%E5%8D%83%E5%93%B22.jpg`},
        {name:'周轶景' , url: `%E5%91%A8%E8%BD%B6%E6%99%AF1.jpg`, hoverUrl: `%E5%91%A8%E8%BD%B6%E6%99%AF2.jpg`}
      ],
      {name:'曹硕' , url: `%E6%9B%B9%E7%A1%951.jpg`, hoverUrl: `%E6%9B%B9%E7%A1%952.jpg`},
      {name:'赵晟孜' , url: `%E8%B5%B5%E6%99%9F%E5%AD%9C1.jpg`, hoverUrl: `%E8%B5%B5%E6%99%9F%E5%AD%9C2.jpg`},
      {name:'曾丽霞' , url: `%E6%9B%BE%E4%B8%BD%E9%9C%9E1.jpg`, hoverUrl: `%E6%9B%BE%E4%B8%BD%E9%9C%9E2.jpg`},
      {name:'李俚' , url: `%E6%9D%8E%E4%BF%9A1.jpg`, hoverUrl: `%E6%9D%8E%E4%BF%9A2.jpg`},
      {name:'孙传祥' , url: `%E5%AD%99%E4%BC%A0%E7%A5%A51.jpg`, hoverUrl: `%E5%AD%99%E4%BC%A0%E7%A5%A52.jpg`},
      {name:'李彦风' , url: `%E6%9D%8E%E5%BD%A6%E9%A3%8E1.jpg`, hoverUrl: `%E6%9D%8E%E5%BD%A6%E9%A3%8E2.jpg`},
      {name:'李欢' , url: `%E6%9D%8E%E6%AC%A21.jpg`, hoverUrl: `%E6%9D%8E%E6%AC%A22.jpg`},
      {name:'empty-item' , url: '', hoverUrl: ''},
      {name:'杨萌' , url: `%E6%9D%A8%E8%90%8C1.jpg`, hoverUrl: `%E6%9D%A8%E8%90%8C2.jpg`},
      [
        {name:'涂强' , url: `%E6%B6%82%E5%BC%BA1.jpg`, hoverUrl: `%E6%B6%82%E5%BC%BA2.jpg`},
        {name:'陈蔓青' , url: `%E9%99%88%E8%94%93%E9%9D%921.jpg`, hoverUrl: `%E9%99%88%E8%94%93%E9%9D%922.jpg`}
      ],
      {name:'梁冬' , url: `%E6%A2%81%E5%86%AC1.jpg`, hoverUrl: `%E6%A2%81%E5%86%AC2.jpg`},
      {name:'殷力京' , url: `%E6%AE%B7%E5%8A%9B%E4%BA%AC1.jpg`, hoverUrl: `%E6%AE%B7%E5%8A%9B%E4%BA%AC2.jpg`},
      {name:'焦阳' , url: `%E7%84%A6%E9%98%B31.jpg`, hoverUrl: `%E7%84%A6%E9%98%B32.jpg`},
      {name:'王兴卓' , url: `%E7%8E%8B%E5%85%B4%E5%8D%931.jpg`, hoverUrl: `%E7%8E%8B%E5%85%B4%E5%8D%932.jpg`},
      {name:'王兴蕾' , url: `%E7%8E%8B%E6%96%B0%E8%95%BE1.jpg`, hoverUrl: `%E7%8E%8B%E6%96%B0%E8%95%BE2.jpg`},
      {name:'王明泽' , url: `%E7%8E%8B%E6%98%8E%E6%B3%BD1.jpg`, hoverUrl: `%E7%8E%8B%E6%98%8E%E6%B3%BD2.jpg`},
      {name:'王爽' , url: `%E7%8E%8B%E7%88%BD1.jpg`, hoverUrl: `%E7%8E%8B%E7%88%BD2.jpg`},
      {name:'王颖' , url: `%E7%8E%8B%E9%A2%961.jpg`, hoverUrl: `%E7%8E%8B%E9%A2%962.jpg`},
      {name:'罗予恩' , url: `%E7%BD%97%E4%BA%88%E6%81%A91.jpg`, hoverUrl: `%E7%BD%97%E4%BA%88%E6%81%A92.jpg`},
      {name:'张俊' , url: `%E5%BC%A0%E4%BF%8A1.jpg`, hoverUrl: `%E5%BC%A0%E4%BF%8A2.jpg`},
      {name:'苏伟荣' , url: `%E8%8B%8F%E4%BC%9F%E8%8D%A3.jpg`, hoverUrl: ''},
      [
        {name:'谢郁' , url: `%E8%B0%A2%E9%83%811.jpg`, hoverUrl: `%E8%B0%A2%E9%83%812.jpg`},
        {name:'田光宇' , url: `%E7%94%B0%E5%85%89%E5%AE%871.jpg`, hoverUrl: `%E7%94%B0%E5%85%89%E5%AE%872.jpg`}
      ],
      {name:'郑亮亮' , url: `%E9%83%91%E4%BA%AE%E4%BA%AE1.jpg`, hoverUrl: `%E9%83%91%E4%BA%AE%E4%BA%AE2.jpg`},
      
      {name:'林枫' , url: `%E6%9E%97%E6%9E%AB.jpg`, hoverUrl: ``},
      {name:'张宇良' , url: `%E5%BC%A0%E5%AE%87%E8%89%AF1.jpg`, hoverUrl: `%E5%BC%A0%E5%AE%87%E8%89%AF2.jpg`},
      [
        {name:'车生然' , url: `%E8%BD%A6%E7%94%9F%E7%84%B61.jpg`, hoverUrl: `%E8%BD%A6%E7%94%9F%E7%84%B62.jpg`},
        {name:'李兴彪' , url: `%E6%9D%8E%E5%85%B4%E5%BD%AA1.jpg`, hoverUrl: `%E6%9D%8E%E5%85%B4%E5%BD%AA2.jpg`}
      ],
      {name:'empty-item' , url: '', hoverUrl: ''},
      [
        {name:'' , url: `IMG_3219.jpg`, hoverUrl: `IMG_3216-2.jpg`},
        {name:'' , url: `IMG_3212.jpg`, hoverUrl: `IMG_3216.jpg`}
      ],
      {name:'闫龙' , url: `%E9%97%AB%E9%BE%991.jpg`, hoverUrl: `%E9%97%AB%E9%BE%992.jpg`},
      {name:'陈建伟' , url: `%E9%99%88%E5%BB%BA%E4%BC%9F1.jpg`, hoverUrl: `%E9%99%88%E5%BB%BA%E4%BC%9F2.jpg`},
      {name:'龙江锦' , url: `%E9%BE%99%E6%B1%9F%E9%94%A61.jpg`, hoverUrl: `%E9%BE%99%E6%B1%9F%E9%94%A62.jpg`},
      {name:'陈承星' , url: `%E9%99%88%E6%89%BF%E6%98%9F.jpeg`, hoverUrl: ``},
      {name:'张大珍' , url: `%E5%BC%A0%E5%A4%A7%E7%8F%8D1.jpg`, hoverUrl: `%E5%BC%A0%E5%A4%A7%E7%8F%8D2.jpg`},
      {name:'洪润辉' , url: `%E6%B4%AA%E6%B6%A6%E8%BE%891.jpg`, hoverUrl: `%E6%B4%AA%E6%B6%A6%E8%BE%892.jpg`},
      {name:'' , url: `IMG_3192.jpg`, hoverUrl: `IMG_3194.jpg`},
      {name:'' , url: `IMG_3196.jpg`, hoverUrl: `IMG_3200.jpg`},
      {name:'张庭岑' , url: `IMG_3219.jpg`, hoverUrl: `IMG_3224.jpg`},
      {name:'李伯伦' , url: `IMG_3299.jpg`, hoverUrl: `IMG_3302.jpg`},
      {name:'马驰' , url: `IMG_3304.jpg`, hoverUrl: `IMG_3309.jpg`},
      {name:'' , url: `IMG_3320.jpg`, hoverUrl: `IMG_3322.jpg`},
      {name:'' , url: `IMG_3324.jpg`, hoverUrl: `IMG_3329.jpg`},
      {name:'安超' , url: `IMG_3332.jpg`, hoverUrl: `IMG_3335.jpg`},
      {name:'姚志秋' , url: `IMG_3338.jpg`, hoverUrl: `%2FIMG_3340.jpg`},
      {name:'empty-item' , url: '', hoverUrl: ''},
    ],
    friendLinks: [
      {
        label: '百度 FEX',
        title: '百度 FEX 团队',
        href: 'http://sux.baidu.com/'
      },
      {
        label: '百度 EFE',
        title: '百度 EFE 团队',
        href: 'http://efe.baidu.com/'
      },
      {
        label: '百度 SUX',
        title: '百度 SUX 团队',
        href: 'http://sux.baidu.com/'
      },
      {
        label: '凹凸实验室',
        title: '京东凹凸实验室，面向多终端技术体系，致力于构建沉淀与分享包括但不限于交互、页面制作技巧、前端开发、原生APP开发等方面的专业知识及案例。',
        href: 'https://aotu.io/',
      },
      {
        label: '人人网FED',
        title: '人人网FED',
        href: 'https://fed.renren.com/',
      }
    ],
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
    return autoKeyword(meta, gift)
      .then(function () {
        return meta
      });
  }
}