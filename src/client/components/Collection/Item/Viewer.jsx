import React from 'react'
import {
  useItemDetails,
  ownsCollection,
  useDocumentTitle,
  useCollectionDetails,
} from 'hooks'
import Imager from 'common/Imager'
import Page from 'common/Page'
import MissingPage from 'common/MissingPage'
import Details from './Details'

export default function ItemViewer({ collectionId, itemId, navigate }) {
  let { collection, error } = useCollectionDetails(collectionId)
  let { item, updateItemAction, isLoading, error: itemError } = useItemDetails({ collectionId, itemId })
  useDocumentTitle(item && item.name, collection && collection.name)
  let isOwner = ownsCollection(collectionId)

  if (!item || isLoading || error || itemError) {
    return (error || itemError) ? <MissingPage message={`Are you sure about that?`} /> : false
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
