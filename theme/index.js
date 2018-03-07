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
    defaultCover: 'http://eux.baidu.com/wp-content/themes/eux/images/no-thumbnail.png',
    pageSize: 12,
    jobs: [
      {
        title: '交互',
        imgSrc: './assets/images/jobs/Interaction-right.png',
        content: ['能用线框构建世界', '能专注逻辑且准确拿捏用户喜好']
      }, {
        title: '视觉',
        imgSrc: './assets/images/jobs/vision-right.png',
        content: ['把每一个像素点都做到极致', '每一次产出都当作是完美表演']
      }, {
        title: '前端',
        imgSrc: './assets/images/jobs/fe-right.png',
        content: ['...', '...']
      }
    ],
    ours: [
      {img: 'jinjing', name: '金晶'},
      {img: 'liuyuan', name: '刘源'},
      {img: 'fanhuimin', name: '范慧敏'},
      {img: 'zhengmingjian', name: '郑明键'},
      {img: 'zhanghua', name: '张华'},
      {img: 'zhangziqing', name: '张紫庆'},
      {img: 'lipenghui', name: '李鹏辉'},
      {img: 'wangxiaoying', name: '王晓莹'},
      {img: 'yangmeng', name: '杨萌'},
      {img: 'yanlong', name: '闫龙'},
      {img: 'zhouyijing', name: '周逸景'},
      {img: 'suntiecheng', name: '孙铁成'},
      {img: 'liangdong', name: '梁冬'},
      {img: 'wuxueyan', name: '吴雪艳'},
      {img: 'kangjiamei', name: '康佳美'},
      {img: 'jiaoyang', name: '焦阳'},
      {img: 'suweirong', name: '苏伟荣'},
      {img: 'wangxinlei', name: '王新蕾'},
      {img: 'hujiani', name: '胡佳妮'},
      {img: 'lirongfei', name: '栗荣飞'},
      {img: 'zhaolinlin', name: '赵琳琳'},
      {img: 'xieyu', name: '谢郁'},
      {img: 'shipeilin', name: '石培林'},
      {img: 'majian', name: '马建'},
      {img: 'xuzhongyuan', name: '徐忠元'},
      {img: 'fanhaiwang', name: '樊海旺'},
      {img: 'muzhilong', name: '母志龙'},
      {img: 'chenchengxing', name: '陈承星'},
      {img: 'gaoqiuju', name: '高秋菊'},
      {img: 'huayun', name: '花云'},
      {img: 'liuhui', name: '刘慧'},
      {img: 'taole', name: '淘乐'},
      {img: 'zhouguangxia', name: '周光夏'},
      {img: 'zhangxuan', name: '张璇'},
      {img: 'zhangpeng', name: '张鹏'},
      {img: 'caiyu', name: '蔡宇'},
      {img: 'feiqianzhe', name: '费千哲'},
      {img: 'leiquan', name: '雷全'},
      {img: 'luoxincheng', name: '罗心成'},
      {img: 'wangying', name: '王颖'},
      {img: 'wujun', name: '吴俊'},
      {img: 'yangjinglin', name: '杨景麟'},
      {img: 'zhengliangliang', name: '郑亮亮'},
      {img: 'chenxiao', name: '陈晓'},
      {img: 'suntiantian', name: '孙甜甜'},
      {img: 'chenjianwei', name: '陈建伟'},
      {img: 'meijingjing', name: '梅晶晶'}
    ].map(item => {
      item.img = `./assets/images/avatar/${item.img}.png`;
      return item;
    }),
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