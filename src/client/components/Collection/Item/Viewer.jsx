import React from 'react'
import { observer, inject } from 'mobx-react'
import Imager from '../../Imager'
import Details from './Details'
import Page from '../../Page'

export const Viewer = ({ collection, collectionId, itemId, user, navigate }) => {
  if (!collection.slug) {
    collection.load(collectionId)
  }

  let image = collection.items.getById(itemId)

  return (
    <Page back className="viewer" navigate={navigate}>
      <Imager
        collection={collectionId}
        id={itemId}
        width={900}
        />
      {
        image && <Details image={image} />
      }
    </Page>
  )
}

export default inject('collection', 'user')(observer(Viewer))
