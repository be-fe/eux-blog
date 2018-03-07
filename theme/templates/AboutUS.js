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

const About = ({ themeConfig }) => {
  const ours = themeConfig.ours.slice()

  // 随机排序
  ours.sort((a, b) => {
    return Math.random() > 0.5 ? -1 : 1
  })
  // 插入 logo 图
  ours.splice(23, 0, { img: 'big', name: 'logo' })

  // 默认图
  const lists = ours.map((item, index) => {
    if (item.name === 'logo') {
      return (
        <li key={index} className="big-logo"/>
      )
    }

    return (
      <li key={index} data-title={item.name}>
        <img className="avatar" src={item.img}/>
      </li>
    )
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
