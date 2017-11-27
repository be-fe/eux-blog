/**
 * @file: Posts
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description: 
 */
import React from 'picidae/exports/react'
import moment from 'picidae/exports/moment'
import collect from 'picidae-tools/browser/collect'
import DocumentTitle from 'react-document-title'
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

const Posts = ({location, params, activeMenu, pluginData: {utils}, themeConfig, routeData, ...props}) => {

  const {key: activeMenuKey} = activeMenu
  const {pageNum = 1} = params;
  const name = join('blog', activeMenuKey);
  const opt = {split: false};
  const {menus = [], title = '', pageSize = 8} = themeConfig;
  const {group, prev, next} = getPage(utils.group(name, opt), {pageNum, pageSize});

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
        date: moment(datetime).format('YYYY-M-D'),
        category
      }
    }

  let realTitle = ''
  console.log('activeMenu', activeMenuKey)
  if (activeMenuKey === '') {
    realTitle = title + ' | ' + themeConfig.homeTitleDesc
  } else {
    realTitle = activeMenu.label + ' | ' + title
  }

  return (
    <DocumentTitle title={realTitle}>
      <div className="eux-stream clearfix">
        <div className="container clearfix">
          <Body
            menus={menus}
            posts={group.map(transform)}
            active={activeMenuKey}
            prev={prev && (prev === 1 ? '/' + activeMenuKey : activeMenuKey + '/page/' + prev)}
            next={next && (activeMenuKey + '/page/' + next)}
          />
        </div>
      </div>
    </DocumentTitle>
  )
}

export default collect(async function ({location, params, themeConfig}) {
  let found = (themeConfig.menus || []).find(({path}) => (params.menu || '/') === path)
  if (!found) {
    return false;
  }
  return {
    activeMenu: {
      ...found,
      key: params.menu || ''
    }
  }
})(Posts)