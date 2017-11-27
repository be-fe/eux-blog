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
    list: [{
      title: '交互',
      imgSrc: 'http://eux.baidu.com/wp-content/themes/eux/images/Interaction-right.png',
      content: ['能用线框构建世界', '能专注逻辑且准确拿捏用户喜好']
    },{
      title: '视觉',
      imgSrc: 'http://eux.baidu.com/wp-content/themes/eux/images/vision-right.png',
      content: ['把每一个像素点都做到极致', '每一次产出都当作是完美表演']
    },{
      title: '前端',
      imgSrc: 'http://eux.baidu.com/wp-content/themes/eux/images/fe-right.png',
      content: ['...', '...']
    }],
    activeIndex: 0
  }

  handleClick = (index) => {
    this.setState({ activeIndex: index });
  }

  render() {
    const {list, activeIndex} = this.state;
    
    // 标题
    const jobTitle = list.map((item, index) => {
      const cls = index === activeIndex ? 'active toggle-bt toggle-fir': 'toggle-bt toggle-fir';
      return (
        <a className={cls} data-index="0" href="javascript:void(0)" onClick = {()=>this.handleClick(index)}>{item.title}</a>        
      )
    })
    
    // 图片
    const jobImg = list.map((item, index) => {
      const cls = index === activeIndex ? 'active right-img': 'right-img';
      return (
        <img src={item.imgSrc} className={cls}/>
      )
    })

    // 简介
    const jobInfo = list.map((item, index) => {
      const cls = index === activeIndex ? 'active job-info': 'job-info';
      const content = item.content.map(item => {
        return (
          <p>{item}</p>
        )
      })
      return (
        <div className={cls}>
            <img src="http://eux.baidu.com/wp-content/themes/eux/images/joinus.png" />
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
