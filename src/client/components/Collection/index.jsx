import React from 'react'
import Grid from './Grid'
import Page from '../Page'
import { useCollectionDetails, useScrollTracking } from '../../hooks'

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

// export default ImageCollection
//inject('app', 'user', 'collection', 'scroll')(observer(ImageCollection))

// componentWillUnmount() {
  //   this.props.scroll.isTracking = false
  //   window.scrollTo(0, 0)
  // }

  // componentDidMount() {
  //   console.log('ImageCollection:props', this.props)
  //   let { collection, collectionId, scroll } = this.props

  //   scroll.restore()
  //   scroll.isTracking = true
  //   collection.load(collectionId || 'krwhitley')
  // }

  // componentDidUpdate(prev) {
  //   let { collectionId, collection } = this.props

  //   if (collectionId !== prev.collectionId) {
  //     collection.load(collectionId || 'krwhitley')
  //   }
  // }

  // return() {
  //   let { app, user, collection, navigate } = this.props
  //   console.log('CollectionIndex', collection)

  //   return (
  //     <Page className="collection">
  //       {
  //         app.editMode && user.isLoggedIn
  //         ? <div className="edit-collection-details">
  //             <LiveEdit
  //               className="h1 collection-title"
  //               value={collection.name}
  //               onChange={collection.set('name')}
  //               placeholder="Gallery Title"
  //             />

  //             {
  //               collection.isDirty && <button
  //                 className="save"
  //                 onClick={collection.save}
  //                 >
  //                 Save Changes
  //               </button>
  //             }
  //           </div>
  //         : <h1 className="collection-title">{ collection.name }</h1>
  //       }
  //       <Grid />
  //     </Page>
  //   )
  // }
