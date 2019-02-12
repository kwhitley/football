import React from 'react'
import Grid from './Grid'
import Page from '../Page'
import { useCollectionDetails, useScrollTracking } from 'hooks'

export default function ImageCollection({ collectionId = 'krwhitley' }) {
  let { collection, isLoading } = useCollectionDetails(collectionId)
  useScrollTracking()

  if (!collection || isLoading) {
    return false
  }

  return (
    <Page className="collection">
      <h1 className="collection-title">{ collection.name }</h1>

      <Grid collectionId={collectionId} items={collection.items} />
    </Page>
  )
}
