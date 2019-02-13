import React from 'react'
import { useCollectionDetails, useScrollTracking, useDocumentTitle } from 'hooks'
import Page from 'common/Page'
import Grid from './Grid'

export default function ImageCollection({ collectionId = 'krwhitley' }) {
  let { collection, isLoading } = useCollectionDetails(collectionId)
  useDocumentTitle(collection && collection.name, 'Supergeneric')
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
