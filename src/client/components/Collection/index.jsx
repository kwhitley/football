import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from './Grid'
import Page from '../Page'
import LiveEdit from '../Controls/LiveEdit'

export class ImageCollection extends Component {
  componentWillUnmount() {
    this.props.scroll.isTracking = false
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    let { collection, scroll, match } = this.props
    let { params } = match

    scroll.restore()
    scroll.isTracking = true
    collection.load(params.collection || 'krwhitley')
  }

  componentDidUpdate(prev) {
    let { match } = this.props
    let { params } = match

    if (prev.match !== match) {
      collection.load(params.collection || 'krwhitley')
      console.log('match update', match, prev, params.collection)
    }
  }

  render() {
    let { app, user, collection, history, match } = this.props
    let { params } = match

    return (
      <Page className="collection">
        {
          app.editMode && user.isLoggedIn
          ? <div className="edit-collection-details">
              <LiveEdit
                className="h1 collection-title"
                value={collection.name}
                onChange={collection.set('name')}
                placeholder="Gallery Title"
              />

              {
                collection.isDirty && <button
                  className="save"
                  onClick={collection.save}
                  >
                  Save Changes
                </button>
              }
            </div>
          : <h1 className="collection-title">{ collection.name }</h1>
        }

        <Grid
          items={collection.items.sorted}
          collection={collection}
          location={location}
          history={history}
          />
      </Page>
    )
  }
}

export default inject('app', 'user', 'collection', 'scroll')(observer(ImageCollection))
