/**
 * @file: Screen
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description: 
 */
import React from 'picidae/exports/react'
import {Link} from 'picidae/exports/react-router'

export default () => (
  <div>
    <h1><Link to="/">百度EUX</Link></h1>
    <h3>百度企业产品用户体验中心</h3>
    <div className="header-bg-images">
      <div className="computer-wrap">
        <img className="large-pillar" src="http://eux.baidu.com/wp-content/themes/eux/images/large-pillar.png" />
        <img className="computer computer-on-phone" src="http://eux.baidu.com/wp-content/themes/eux/images/computer-on-phone.png" />
        <img className="computer computer-on-com" src="http://eux.baidu.com/wp-content/themes/eux/images/computer.gif" />
      </div>
      <div className="watch-wrap">
        <img className="watch watch-on-com" src="http://eux.baidu.com/wp-content/themes/eux/images/watch.gif" />
        <img className="watch watch-on-phone" src="http://eux.baidu.com/wp-content/themes/eux/images/watch-on-phone.png" />
        <img className="pillar-under-watch" src="http://eux.baidu.com/wp-content/themes/eux/images/pillar-under-watch.png" />
      </div>
      <img className="small-pillar" src="http://eux.baidu.com/wp-content/themes/eux/images/small-pillar.png" />
      <img className="pad" src="http://eux.baidu.com/wp-content/themes/eux/images/pad.png" />
      <img className="phone" src="http://eux.baidu.com/wp-content/themes/eux/images/phone.png" />
      <img className="tower" src="http://eux.baidu.com/wp-content/themes/eux/images/tower.png" />
      <img className="pillar-behind-watch" src="http://eux.baidu.com/wp-content/themes/eux/images/pillar-behind-watch.png" />
    </div>
  </div>
)