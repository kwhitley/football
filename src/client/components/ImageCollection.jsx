import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'

export class ImageCollection extends Component {
  componentWillUnmount() {
    this.props.scroll.save(window.scrollX, window.scrollY)
    console.log('ImageCollection:scrolling to top')
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.props.scroll.restore()
  }

  render() {
    let { images } = this.props

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
