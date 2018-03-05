/**
 * @file: Posts
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */

import React from 'picidae/exports/react'
import {Link} from 'picidae/exports/react-router'

const Post = ({title, to, coverUrl, name, date, category = {}}) => (
  <article className="eux-card">
    <h2>
      <Link to={to}>{title}</Link>
    </h2>
    <div className="eux-card-thumbnail"
         style={{backgroundImage: 'url(' + JSON.stringify(coverUrl) +')'}}>
      <Link to={to}><img src={coverUrl}/></Link>
    </div>
    <footer>
      <span className="eux-card-author"><em>by.</em>{name}</span>
      <span className="eux-card-time">{date}</span>
      {/*<span className="eux-card-like"><span className="eux-icon eux-icon-like"/>55</span>*/}
      <span className="eux-card-category">
        <Link to={category.to} rel="category tag">{category.name}</Link>
      </span>
      {/*            <span class="eux-card-comment"><span></span>*/}
      {/*</span>*/}
    </footer>
  </article>
)

export default ({posts = []}) => (
  <div className="inner clearfix">
    {posts.map((post, i) => <Post key={i} {...post}/>)}
  </div>
)