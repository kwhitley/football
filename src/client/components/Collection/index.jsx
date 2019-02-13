import React from 'react'
import { useCollectionDetails, useScrollTracking, useDocumentTitle } from 'hooks'
import Page from 'common/Page'
import MissingPage from 'common/MissingPage'
import Grid from './Grid'

export default function ImageCollection({ collectionId = 'krwhitley' }) {
  let { collection, error, isLoading } = useCollectionDetails(collectionId)
  useDocumentTitle(collection && collection.name, 'Supergeneric')
  useScrollTracking()

  if (!collection || isLoading || error) {
    return error ? <MissingPage message={`Are you sure about that?`} /> : false
  }

  return (
    <Page className="collection">
      <h1 className="collection-title">{ collection.name }</h1>

      <Grid collectionId={collectionId} items={collection.items} />
    </Page>
  )
}
