import React from 'react'
import { observer, inject } from 'mobx-react'
import Imager from './Imager'
import ImageDetails from './ImageDetails'

export const Viewer = ({ images, user, match, history, location }) => {
  let image = images.getById(match.params.id)

  return (
    <div className="viewer">
      <Imager
        collection={match.params.collection}
        id={match.params.id}
        width={900}
        />
      {
        image && <ImageDetails image={image} />
      }
    </div>
  )
}

export default inject('images', 'user')(observer(Viewer))
