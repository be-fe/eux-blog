/**
 * @file: Pagination
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */

import React from 'picidae/exports/react'
import {Link} from 'picidae/exports/react-router'

export default ({prev, next}) => (
  <nav className="page-bar clearfix" role="navigation">
    {prev != null && <Link to={prev} className="prev eux-icon eux-icon-page-prev"/>}
    {next != null && <Link to={next} className="next eux-icon eux-icon-page-next"/>}
  </nav>
)