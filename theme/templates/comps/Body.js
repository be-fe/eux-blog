/**
 * @file: Body
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description: 
 */

import React from 'picidae/exports/react'

import Categories from './Categories'
import Posts from './Posts'
import Pagination from './Pagination'

const Body = ({posts = [], menus = [], active, prev, next}) => (
  <div>
    <Categories menus={menus} active={active}/>
    <Posts posts={posts}/>
    <Pagination prev={prev} next={next}/>
  </div>
)

export default Body