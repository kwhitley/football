import React from 'react'
import Imager from '../../Imager'
import Details from './Details'
import Page from '../../Page'
import { useItemDetails } from '../../../hooks'
import Inspect from '../../Controls/Inspect'

export default function ItemViewer({ collectionId, itemId, navigate }) {
  let { item, isLoading } = useItemDetails({ collectionId, itemId })

  if (!item || isLoading) {
    return false
  }

  return (
    <Page back className="viewer" navigate={navigate}>
      <Imager
        id={collectionId + '/' + item.id}
        width={900}
        />
      <Details item={item} />
    </Page>
  )
}
