import React, { h, Component } from 'react'
import { observer, inject } from 'mobx-react'
import Imager from './Imager'
import ImageDetails from './ImageDetails'

export const Viewer = ({ images, match }) => {
  let image = images.getById(match.params.id)

  return (
    <div className="viewer">
      <Imager
        id={match.params.id}
        width={900}
        />
      {
        image && <ImageDetails image={image} />
      }
    </div>
  )
}


export default inject('images')(observer(Viewer))
