import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'

export class ImageCollection extends Component {
  componentWillUnmount() {
    this.props.scroll.isTracking = false
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.props.scroll.restore()
    this.props.scroll.isTracking = true
  }

  render() {
    let { images, match } = this.props
    console.log('match', match)

    return (
      <React.Fragment>
        <Grid
          items={images.itemsSorted}
          location={location}
          history={history}
          />
      </React.Fragment>
    )
  }
}

export default inject('images', 'scroll')(observer(ImageCollection))
