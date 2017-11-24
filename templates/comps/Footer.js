/**
 * @file: Footer
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import c from 'classname'

export default ({className}) => (
  <footer className="footer">
    {/* .eux-hidden-area */}
    <div className={c("eux-footer-area-wrapper", className)} role="complementary">
      <div className="inner clearfix">
        <aside id="simple-links-2" className="widget sl-links-main"><h2 className="widgettitle">友情链接</h2>
          <ul className="simple-links-list simple-links-2-list" id="simple-links-2-list"><li className="simple-links-item simple-links-widget-item" id="link-379"><a href="http://sux.baidu.com" target="_blank" title="百度搜索用户体验中心">百度 SUX</a></li><li className="simple-links-item simple-links-widget-item" id="link-362"><a href="http://fex.baidu.com/" target="_blank" title="百度 FEX 团队">百度 FEX</a></li><li className="simple-links-item simple-links-widget-item" id="link-368"><a href="http://efe.baidu.com/" target="_blank" title="百度 EFE 团队">百度 EFE</a></li><li className="simple-links-item simple-links-widget-item" id="link-795"><a href="https://aotu.io/" target="_blank" title="京东凹凸实验室，面向多终端技术体系，致力于构建沉淀与分享包括但不限于交互、页面制作技巧、前端开发、原生APP开发等方面的专业知识及案例。">凹凸实验室</a></li></ul>{/* End .simple-links-list */}</aside>          </div>
    </div>
    {/* /.eux-hidden-area */}
    <div className="eux-icp">百度EUX&nbsp;版权所有&nbsp;©百度EUX&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.&nbsp;骄傲地采用&nbsp;WordPress。</div>
  </footer>
)