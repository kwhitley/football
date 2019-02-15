import React from 'react'
import {
  useItemDetails,
  ownsCollection,
  useDocumentTitle,
  useCollectionDetails,
} from 'hooks'
import Imager from 'Common/Imager'
import Page from 'Common/Page'
import MissingPage from 'Common/MissingPage'
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
        height={900}
        fit="inside"
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
