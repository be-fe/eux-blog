/**
 * @file: Footer
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import c from 'classname'

export default ({className, friendLinks = []}) => (
  <footer className="footer">
    {/* .eux-hidden-area */}
    <div className={c("eux-footer-area-wrapper", className)} role="complementary">
      <div className="inner clearfix">
        <aside id="simple-links-2" className="widget sl-links-main"><h2 className="widgettitle">友情链接</h2>
          <ul className="simple-links-list simple-links-2-list" id="simple-links-2-list">
            {
              friendLinks.map(({title, href, label}, i) => (
                <li key={i} className="simple-links-item simple-links-widget-item" id="link-379">
                  <a target="_blank" title={title || label}>{label || title}</a>
                </li>
              ))
            }
          </ul>
        </aside>
      </div>
    </div>
    {/* /.eux-hidden-area */}
    <div className="eux-icp">百度EUX&nbsp;版权所有&nbsp;©百度EUX&nbsp;&nbsp;&nbsp;&nbsp;All rights reserved.&nbsp;骄傲地采用&nbsp;
      <a target="_blank" href="https://github.com/picidaejs/picidaejs">Picidae</a>。
    </div>
  </footer>
)