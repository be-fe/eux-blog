/**
 * @file: Posts
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description: 
 */
import React from 'picidae/exports/react'
import moment from 'picidae/exports/moment'
import collect from 'picidae-tools/browser/collect'
import {join} from 'path'

import Body from './comps/Body'
import {menus} from './comps/Categories'

// title, to, coverUrl, name, date, category: {to, name}

const getPage = function (group = [], {pageSize, pageNum}) {
  let total = group.length;
  pageNum = parseInt(pageNum);
  pageSize = parseInt(pageSize);
  group = group.slice(pageSize * (pageNum - 1), pageSize * pageNum)
  let currLen = pageSize * pageNum
  return {
    group,
    prev: pageNum > 1 ? pageNum - 1 : null,
    next: total > currLen ? pageNum + 1 : null
  }
}

const Posts = ({location, params, pluginData: {utils}, themeConfig, routeData, ...props}) => {
  const {pageNum = 1, menu: activeMenu = ''} = params;
  const pageSize = themeConfig.pageSize || 8;
  const name = join('blog', activeMenu);
  const opt = {split: false}

  const {group, prev, next} = getPage(utils.group(name, opt), {pageNum, pageSize});
  const menus = themeConfig.menus || []

  const transform =
    ({
       title,
       _key,
       cover,
       author,
       datetime
     }) => {
      let found = menus.find(menu => {
        let chunks = _key.split('/');
        chunks.shift();
        let path = chunks.join('/')
        if (path.startsWith(menu.path)) {
          return true;
        }
      })
      let category = {
        name: '未分类',
        to: '/'
      }
      if (found) {
        category = {
          name: found.label,
          to: found.path
        }
      }
      return {
        title,
        to: _key,
        coverUrl: cover || themeConfig.defaultCover,
        name: author,
        date: moment(datetime).format('YYYY-MM-D'),
        category
      }
    }
  return (
    <div className="eux-stream clearfix">
      <div className="container clearfix">
        <Body
          menus={menus}
          posts={group.map(transform)}
          active={activeMenu}
          prev={prev && (prev === 1 ? '/' + activeMenu : activeMenu + '/page/' + prev)}
          next={next && (activeMenu + '/page/' + next)}
        />
      </div>
    </div>
  )
}

export default collect(async function ({location, params, themeConfig}) {
  console.log(params)
  let found = (themeConfig.menus || []).find(({path}) => (params.menu || '/') === path)
  if (!found) {
    return false;
  }
})(Posts)