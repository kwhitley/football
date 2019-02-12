import React from 'react'
import Imager from '../../Imager'
import Details from './Details'
import Page from '../../Page'
import { useItemDetails, ownsCollection } from 'hooks'

export default function ItemViewer({ collectionId, itemId, navigate }) {
  let { item, updateItemAction, isLoading } = useItemDetails({ collectionId, itemId })
  let isOwner = ownsCollection(collectionId)

  if (!item || isLoading) {
    return false
  }

  return (
    <Page back className="viewer" navigate={navigate}>
      <Imager
        id={collectionId + '/' + itemId}
        width={900}
        />
      <Details
        collectionId={collectionId}
        item={item}
        isOwner={isOwner}
        updateItemAction={updateItemAction}
        />
    </Page>
  )
}
