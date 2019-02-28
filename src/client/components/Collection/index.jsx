import React from 'react'
import {
  useCollectionDetails,
  useScrollTracking,
  useDocumentTitle,
} from 'hooks'
import Page from 'Common/Page'
import MissingPage from 'Common/MissingPage'
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

      <Grid collection={collection} />
    </Page>
  )
}
