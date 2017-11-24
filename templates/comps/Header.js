/**
 * @file: Header
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import {Link} from 'picidae/exports/react-router'
import c from 'classname'

import Screen from './Screen'

export default ({withScreen}) => (
  <header className={c('clearfix', withScreen ? 'eux-header-home' : 'eux-header')}>
    {withScreen && <Screen/>}
    <div className="eux-header-top">
      <Link to="javascript:void(0);" className="eux-portable-menu"/>
      <nav className="menu-primary-container">
        <ul id="menu-primary" className="menu">
          <li id="menu-item-25" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-25">
            <Link to="/">HOME</Link>
          </li>
          <li id="menu-item-45"
              className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-45">
            <Link to="/">BLOG</Link>
            <ul className="sub-menu">
              <li id="menu-item-63"
                  className="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-63">
                <Link to="/ue">交互</Link>
              </li>
              <li id="menu-item-67"
                  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-67">
                <Link to="/ui">视觉</Link>
              </li>
              <li id="menu-item-64"
                  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-64">
                <Link to="/fe">前端</Link>
              </li>
              <li id="menu-item-62"
                  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-62">
                <Link to="/team">团队</Link>
              </li>
            </ul>
          </li>
          <li id="menu-item-46" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-46">
            <Link to="/tools">TOOLS</Link></li>
          <li id="menu-item-112" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112">
            <Link to="/works">WORKS</Link></li>
          <li id="menu-item-138" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138">
            <Link to="/jobs">JOBS</Link></li>
          <li id="menu-item-50" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-50">
            <Link to="/about-us">ABOUT US</Link></li>
        </ul>
      </nav>
    </div>
  </header>
)