/**
 * @file: Layout
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import DocumentTitle from 'react-document-title'

import './assets/style/index.less'

export default ({themeConfig: {title}}) => (
  <DocumentTitle title={'404 | ' + title}>
    <div className="eux-no-content clearfix">
      <p>404</p>
    </div>
  </DocumentTitle>
)