/**
 * @file: DisqusComment
 * @author: Cuttle Cong
 * @date: 2017/11/25
 * @description:
 */

import React from 'react'

const tmp = {}

export default class extends React.PureComponent {

  componentWillMount() {

  }

  resetComment = (props = this.props) => {
    if (typeof Valine !== 'undefined') {
      if (window.AV) {
        window.AV.applicationId = null
      }
      new Valine({
        ...props,
        el: this.refs.comment,
        av: window.AV,
        path: window.location.pathname,
        // notify: false,
        // verify: false,
        // appId: '这里填上面获得的appid',
        // appKey: '这里填上面获得的appkey',
        // placeholder: 'just go go',
        // avatar: 'mm'
      });
    }
  }

  componentDidMount() {
    const {short, identity, title, url} = this.props;
    if (typeof document !== 'undefined' && !tmp.loaded) {
      var script = document.createElement('script')
      script.src = '//cdn1.lncld.net/static/js/3.0.4/av-min.js';
      (document.head || document.body).appendChild(script);
      var self = this;

      var script_2 = document.createElement('script')
      script_2.src = '//unpkg.com/valine@1.1.8-rc3/dist/Valine.min.js'
      script_2.async = true;
      (document.head || document.body).appendChild(script_2);

      Promise.all([
        new Promise(function (resolve) {
          script.onload = function () {
            resolve()
          }
        }),
        new Promise(function (resolve) {
          script_2.onload = function () {
            resolve()
          }
        }),
      ])
      .then(() => this.resetComment())
      tmp.loaded = true;
    } else {
      // not first render.
      this.resetComment();
    }
  }

  componentWillReceiveProps(newProps) {

  }

  componentWillUpdate(newProps, newState, newContext) {
  }

  componentDidUpdate(oldProps, oldState, oldContext) {
    this.resetComment();
  }

  componentWillUnmount() {
  }

  static defaultProps = {}
  state = {}
  static propTypes = {
    short: React.PropTypes.string,
    url: React.PropTypes.string,
    title: React.PropTypes.string,
    identity: React.PropTypes.string,
  }

  render() {
    return (
      <div className="valine-comment-container" ref="comment">
      </div>
    )
  }
}