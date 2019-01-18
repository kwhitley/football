import React, { h, Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'

export class ImageCollection extends Component {
  componentWillUnmount() {
    // console.log('window position', window.scrollY)
    this.props.scroll.save(window.scrollX, window.scrollY)
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    // console.log('mounted', window.scrollY)
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
