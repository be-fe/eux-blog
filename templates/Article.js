/**
 * @file: Layout
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import moment from 'picidae/exports/moment'
import {Link} from 'picidae/exports/react-router'
import collect from 'picidae-tools/browser/collect'
import DocumentTitle from 'react-document-title'
import {join} from 'path'

import Categories from './comps/Categories'
import DisqusComment from './comps/DisqusComment'
import ValineComment from './comps/ValineComment'

const Article = ({location, render, params, pageData, themeConfig, pluginData: {utils}, ...props}) => {

  const {curr, prev, next} = utils.pagination(join('blog', params.group), {split: false})
  const {comment: {use, ...commentSet}, title} = themeConfig
  const usedComment = commentSet[use]

  return (
    <DocumentTitle title={pageData.meta.title + ' | ' + title}>
      <div className="eux-singular clearfix">
        <div className="container-singular clearfix">
          <Categories active={params.group} menus={themeConfig.menus}/>
          <div className="inner clearfix">
            <div className="article-meta">
              <h1 className="title">{pageData.meta.title}</h1>
              <div className="eux-page-detail">
                <span><em>by.</em>{pageData.meta.author}</span>
                <span>{moment(pageData.meta.datetime).format('YYYY-M-D')}</span>
              </div>
            </div>
            {render()}

            <div>
              {
                use === 'disqus'
                && usedComment
                && <DisqusComment url={'http://' + join(usedComment.host, location.pathname)} {...usedComment} />
              }
              {
                use === 'valine'
                && usedComment
                && <ValineComment path={'http://' + join(usedComment.host || '', location.pathname)} {...usedComment} />
              }
            </div>
            <nav className="single-bar clearfix">
              {
                prev &&
                <span className="prev">
                <Link to={prev._key} rel="prev">
                  <em className="eux-icon eux-icon-page-prev"/>{prev.title}
                </Link>
              </span>
              }
              {
                next &&
                <span className="next">
                <Link to={next._key} rel="next">
                  <em className="eux-icon eux-icon-page-next"/>{next.title}
                </Link>
              </span>
              }
            </nav>
          </div>

        </div>
      </div>
    </DocumentTitle>
  )
}

export default collect()(Article)