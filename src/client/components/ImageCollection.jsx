import React from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'

export const ImageCollection = ({ images }) =>
  <React.Fragment>
    <Grid items={images.items} />
  </React.Fragment>

export default inject('images')(observer(ImageCollection))
