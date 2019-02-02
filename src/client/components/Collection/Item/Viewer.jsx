import React from 'react'
import { observer, inject } from 'mobx-react'
import Imager from '../../Imager'
import Details from './Details'
import Page from '../../Page'

export const Viewer = ({ collection, user, match, history, location }) => {
  let { params } = match

  if (!collection.slug) {
    collection.load(params.collection)
  }

  let image = collection.items.getById(params.id)

  return (
    <Page back className="viewer" history={history}>
      <Imager
        collection={match.params.collection}
        id={match.params.id}
        width={900}
        />
      {
        image && <Details image={image} />
      }
    </Page>
  )
}

export default inject('collection', 'user')(observer(Viewer))
