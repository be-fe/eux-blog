/**
 * @file: Categories
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */

import React from 'picidae/exports/react'
import PropTypes from 'picidae/exports/prop-types'
import {Link} from 'picidae/exports/react-router'
import c from 'classname'

const Categories = ({menus = [], active}) => {
  return (
    <nav className="menu-categories-container">
      <ul id="menu-categories" className="menu">
        {
          menus.map(({label, path}, i) => (
            <li key={i}
                className={
                  c((path === active || path.replace(/^\/*/g, '') === active) && 'current-menu-item', "menu-item menu-item-type-custom menu-item-object-custom current_page_item menu-item-55")
                }
            >
              <span>
                <Link to={path}>{label}</Link>
              </span>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Categories