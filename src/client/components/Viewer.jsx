import React from 'react'
import { observer, inject } from 'mobx-react'
import Imager from './Imager'
import ImageDetails from './ImageDetails'

export const Viewer = ({ collection, user, match, history, location }) => {
  let { params } = match

  if (!collection.slug) {
    collection.load(params.collection)
  }

  let image = collection.items.getById(params.id)

  return (
    <div className="viewer">
    <pre>
    { JSON.stringify(params, null, 2) }
    </pre>
    <pre>
    { JSON.stringify(image, null, 2) }
    </pre>
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

export default inject('collection', 'user')(observer(Viewer))
