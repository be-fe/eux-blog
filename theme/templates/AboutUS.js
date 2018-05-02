/**
 * @file: About us
 * @author: 陈蔓青
 * @date: 2017/11/26
 * @description: 关于我们
 */

import React from 'picidae/exports/react'
import PropTypes from 'picidae/exports/prop-types'

import './assets/style/index.less'
import './assets/style/about-us.less'

const baseUrl = 'http://eux-blog-static.bj.bcebos.com/photo%2F';
const baseExt = '@h_160,w_160';
const About = ({ themeConfig }) => {
  const ours = themeConfig.ours.slice()
  // 插入 logo 图
  ours.splice(28, 0, {name:'logo' , url: `aboutus-baidu.png`, hoverUrl: ''},)

  const getSingleItem = function(item, index, className) {
    let hoverUrl = '';
    if (item.hoverUrl !== '') {
      hoverUrl = <img className="avatar-hover" src={`${baseUrl}${item.hoverUrl}${baseExt}`} title={item.name} alt={item.name}/>
    }
    return (
      <li className={`${className}-item`} key={index} data-title={item.name}>
        <img className="avatar" src={`${baseUrl}${item.url}${baseExt}`} title={item.name} alt={item.name}/>
        {hoverUrl}
      </li>
    )
  }

  const ramdomColors = ['#E3B587', '#b0a085', '#e2bd3b', '#519670', '#caddd5'];
  const lists = ours.map((item, index) => {
    if (Object.prototype.toString.call(item) === '[object Array]') { // 联动的
      const multipleItem = item.map((key, idx) => {
        const itemKey = index + '-' + idx;
        return getSingleItem(key, itemKey, 'multiple')
      })
      return <div className="multiple-items">{multipleItem}</div>;
    } else { // 一个人
      if (item.name === 'logo') {
        return (
          <li key={index} className="big-logo"/>
        )
      } else if (item.name === 'empty-item') {
        const style = {
          backgroundColor: ramdomColors[Math.floor(Math.random() * ramdomColors.length)]
        };
        return (
          <li key={index} className='empty-item' style={style}/>
        )
      } else {
        return getSingleItem(item, index, 'single');
      }
    }
  })

  return (
    <div className="eux-aboutus clearfix">
      <div className="container-aboutus clearfix">
        <div className="eux-aboutus-img-list">
          <ul className="about-grid">
            {lists}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
