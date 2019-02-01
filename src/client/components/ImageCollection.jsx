import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'

export class ImageCollection extends Component {
  componentWillUnmount() {
    this.props.scroll.isTracking = false
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    let { collection, scroll, match } = this.props
    let { params } = match

    scroll.restore()
    scroll.isTracking = true
    collection.load(params.collection || 'krwhitley')
  }

  render() {
    let { collection, images, match } = this.props
    let { params } = match

    return (
      <React.Fragment>
        <Grid
          items={collection.items.sorted}
          collection={collection}
          location={location}
          history={history}
          />
      </React.Fragment>
    )
  }
}

export default inject('collection', 'images', 'scroll')(observer(ImageCollection))
