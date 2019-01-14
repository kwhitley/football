import React from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

const foo = {
  bar: 'baz',
  me: 'Kevin',
  age: 38,
}

export default (Component) => {
  return class ScrollRestorable extends React.Component {
    render() {
      console.log('props', this.props)
      return <Component {...this.props} {...foo} />
    }
  }
}
