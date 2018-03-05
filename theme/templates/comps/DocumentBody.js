/**
 * @file DocumentBody
 * @author Cuttle Cong
 * @date 2018/3/5
 * @description
 */

import React from 'picidae/exports/react'
import ReactDOM from 'picidae/exports/react-dom'

let container
function getSingleDOM() {
  if (!container) {
    container = document.createElement('div')
    document.body.appendChild(container)
  }
  return container
}
function appendToBody(children) {
  const dom = getSingleDOM()
  if (typeof document !== 'undefined') {
    ReactDOM.render(
      <div>
        {children}
      </div>,
      dom
    )
  }
}

export default class DocumentBody extends React.Component {

  componentDidMount() {
    appendToBody(this.props.children)
  }
  componentWillReceiveProps(nextProps) {
    appendToBody(nextProps.children)
  }

  render() {
    return null
  }
}
