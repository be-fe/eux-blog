/**
 * @file: Layout
 * @author: Cuttle Cong
 * @date: 2017/11/24
 * @description:
 */
import React from 'picidae/exports/react'
import Favicon from 'react-favicon'
import PropTypes from 'picidae/exports/prop-types'

import Header from './comps/Header'
import Footer from './comps/Footer'

import './assets/style/index.less'

export default class Layout extends React.PureComponent {
  getChildContext() {
    return {
      location: this.props.location
    }
  }

  static childContextTypes = {
    location: PropTypes.object
  }

  componentDidMount() {
    if (window._vds) {
      // no-op _vds would overwrite window.history.pushState
      // this.unlisten = this.props.router.listen(loc => {
      //   window._vds.trackPV()
      // })
    }
  }

  componentWillUnmount() {
    // if (this.unlisten) {
    //   this.unlisten()
    // }
  }

  get withScreen() {
    const { params = {}, location } = this.props
    return location.pathname === '/' ||
           params.pageNum != null && params.menu == null
  }

  render() {
    const { children, location, params, router, themeConfig } = this.props
    return (
      <div className="main">
        <Favicon url={require('./assets/images/logo.png')}/>
        <Header
          withScreen={this.withScreen}
          router={router}
          screen={{ title: themeConfig.title, desc: themeConfig.homeTitleDesc }}
          menus={
            themeConfig
              .menus
              .map(x => (
                { ...x, path: x.path.replace(/^\/*/, '/') }
              ))
              .filter(x => x.path !== '/')
          }
        />
        {children}
        <Footer
          className={location.pathname.startsWith('blog/') ? 'container-singular' : 'container'}
          friendLinks={themeConfig.friendLinks}
        />
      </div>
    )
  }
}