/**
 * @file: Layout
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import DocumentTitle from 'react-document-title'
import links from './assets/links.json'
import { Link } from 'picidae/exports/react-router'
import { parse, format } from 'url'
import { basename, join } from 'path'

const paths = links.map(({ link, ...rest }) => (
  { ...parse(link), host: 'eux.baidu.com', protocol: 'http:', other: rest }
))

function getRedirectIndex(pathname) {
  return paths.findIndex(({ pathname: innerPathname }) =>
    innerPathname.toLowerCase().replace(/^\/*/, '') === pathname.toLowerCase().replace(/^\/*/, '')
  )
}


export default class extends React.PureComponent {
  componentDidMount() {
    if (this.isRedirect) {
      this._timer = setInterval(this.decrease, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this._timer)
    delete this._timer
  }

  componentDidUpdate() {
    if (this.state.count === 0) {
      location.href = this.redirectUrl
    }
  }

  state = {
    count: 5
  }
  decrease = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  get redirectIndex() {
    return getRedirectIndex(this.props.location.pathname)
  }

  get isRedirect() {
    return this.redirectIndex >= 0
  }

  get redirectUrl() {
    const index = this.redirectIndex
    if (index >= 0) {
      return format(paths[index])
      // return `/blog/${join(paths[index].other.menu, basename(paths[index].pathname))}`
    }
  }

  get RedirectView() {
    const url = this.redirectUrl
    if (!url) {
      return null
    }

    return (
      <div>
        <div>
          页面搬家啦，<a href={url}>点击此处跳转</a>
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ color: 'orange' }}>{this.state.count} </span>s 后将自动跳转
        </div>
      </div>
    )
  }

  render()
  {
    const { themeConfig: { title }, location: { pathname } } = this.props
    return (
      <DocumentTitle title={'404 | ' + title}>
        <div className="eux-no-content clearfix">
          <p>
            <div style={{ marginBottom: 8 }}>404</div>
            {this.RedirectView}
          </p>
        </div>
      </DocumentTitle>
    )
  }
}