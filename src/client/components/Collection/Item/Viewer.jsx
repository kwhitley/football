import React from 'react'
import {
  useItemDetails,
  useDocumentTitle,
  useCollectionDetails,
} from 'hooks'
import Imager from 'Common/Imager'
import Page from 'Common/Page'
import MissingPage from 'Common/MissingPage'
import Details from './Details'

export default function ItemViewer({ collectionId, itemId, navigate }) {
  let {
    item,
    updateItemAction,
    isLoading,
    error,
  } = useItemDetails({ collectionId, itemId })
  useDocumentTitle(item && item.name, item && item.collection.name)

  if (!item || isLoading || error) {
    return (error) ? <MissingPage message={`Are you sure about that?`} /> : false
  }

  return (
    <Page back className="viewer" navigate={navigate}>
      <Imager
        path={item.imagePath}
        width={1500}
        height={1500}
        fit="inside"
        />
      <Details
        collectionId={item.collection.slug}
        item={item}
        updateItemAction={updateItemAction}
        />
    </Page>
  )
}
