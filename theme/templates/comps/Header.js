/**
 * @file: Header
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import { Link, withRouter } from 'picidae/exports/react-router'
import c from 'classname'

import Screen from './Screen'
import DocumentBody from './DocumentBody'

function toggleSideBar() {
  const list = document.body.classList
  if (list.contains('portable-menu-screen')) {
    list.add('restore')
    setTimeout(list.remove.bind(list), 300, 'portable-menu-screen', 'restore')
  }
  else {
    list.add('portable-menu-screen')
  }
}

const Menu = ({ children, router }) => (
  <ul id="menu-primary" className="menu">
    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-25">
      <RouterLink path="/" router={router}>HOME</RouterLink>
    </li>
    <li
      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-45">
      <RouterLink path="/" router={router}>BLOG</RouterLink>
      {children}
    </li>
    <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-46">
      <RouterLink path="/tools" router={router}>TOOLS</RouterLink></li>
    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112">
      <RouterLink path="/works" router={router}>WORKS</RouterLink></li>
    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-138">
      <RouterLink path="/jobs" router={router}>JOBS</RouterLink></li>
    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-50">
      <RouterLink path="/about-us" router={router}>ABOUT US</RouterLink></li>
  </ul>
)

function RouterLink({ router, children, path }) {
  return !router ? <Link to={path}>{children}</Link>
    : <a onClick={() => router.push(path)}>{children}</a>
}

function computedMenus(menus = [], router) {
  return menus.map(({ label, path }, i) => (
    <li key={Date.now() + i} className="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-63">
      <RouterLink router={router} path={path}>{label}</RouterLink>
    </li>
  ))
}

export default ({ withScreen, screen = {}, menus = [], router }) => {
  return (
    <header className={c(withScreen ? 'eux-header-home' : 'eux-header', 'clearfix')}>
      {withScreen && <Screen {...screen} />}
      <div className="eux-header-top">
        <a href="javascript:void(0);" className="eux-portable-menu" onClick={toggleSideBar}>
          <span/><span/><span/>
        </a>
        <DocumentBody>
          <nav className="menu-portable-container">
            <Menu router={router} />
            <div className="menu-portable-caption">分类导航</div>
            <ul className="menu">
              {computedMenus(menus, router)}
            </ul>
          </nav>
        </DocumentBody>
        <nav className="menu-primary-container">
          <Menu>
            <ul className="sub-menu">
              {computedMenus(menus)}
            </ul>
          </Menu>
        </nav>
      </div>
    </header>
  )
}