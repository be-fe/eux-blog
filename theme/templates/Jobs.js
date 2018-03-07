/**
 * @file: Jobs
 * @author: 陈蔓青
 * @date: 2017/11/26
 * @description: 
 */
import React from 'picidae/exports/react'

import './assets/style/joinus.less'

export default class Jobs extends React.PureComponent {
  // 稍后数据抽成可配置项
  state = {
    activeIndex: 0
  }

  handleClick = (index) => {
    this.setState({ activeIndex: index });
  }

  render() {
    const {activeIndex} = this.state;
    const list = this.props.themeConfig.jobs;
    
    // 标题
    const jobTitle = list.map((item, index) => {
      const cls = index === activeIndex ? 'active toggle-bt toggle-fir': 'toggle-bt toggle-fir';
      return (
        <a key={index} className={cls} data-index="0" href="javascript:void(0)" onClick = {()=>this.handleClick(index)}>{item.title}</a>
      )
    })
    
    // 图片
    const jobImg = list.map((item, index) => {
      const cls = index === activeIndex ? 'active right-img': 'right-img';
      return (
        <img key={index} src={item.imgSrc} className={cls}/>
      )
    })

    // 简介
    const jobInfo = list.map((item, index) => {
      const cls = index === activeIndex ? 'active job-info': 'job-info';
      const content = item.content.map((item, i) => {
        return (
          <p key={i}>{item}</p>
        )
      })
      return (
        <div key={index} className={cls}>
            <img src={require('../../extra/images/jobs/joinus.png')} />
            <p>如果你</p>
            {content}
            <p>请把你的简历发给我们</p>
            <a className="mailTo" href="mailto:befe-blog@baidu.com">befe-blog@baidu.com</a>
        </div>
      )
    })

    return (
      <div className="eux-joinus clearfix">
      <div className="container clearfix">
        <div className="slider-wrap">
            {jobImg}
            <div className="info-box">
                {jobInfo}
                <div id="toggle-wrap">
                    {jobTitle}
                </div>
            </div>
        </div>
      </div>
    </div>
    )
  }
}
