import React, { useState, useEffect } from 'react'
import md from 'react-markings'

import LiveEdit from '../../Controls/LiveEdit'
import Input from '../../Controls/Input'
import Inspect from '../../Controls/Inspect'
import { ownsCollection } from '../../../hooks'

export default function ImageDetails({ collectionId, item, updateItemAction }) {
  let [ update, setUpdate ] = useState(item)
  let [ isDirty, setIsDirty ] = useState(false)
  let editable = ownsCollection(collectionId)

  return (
    <div className="image-details">

      {
        editable
        ? <LiveEdit
            className="h1"
            value={update.name}
            onChange={name => {
              setIsDirty(true)
              setUpdate({ ...update, name })
            }}
            placeholder="Image Title"
            />
        : <h1>{ item.name }</h1>
      }

      {
        editable
        ? <LiveEdit
            className="story"
            value={update.story}
            onChange={story => {
              setIsDirty(true)
              setUpdate({ ...update, story })
            }}
            placeholder="Story or Description"
            />
        : <div className="story">
            { md([item.story]) }
          </div>
      }

      {
        editable &&
        <button
          disabled={!isDirty}
          onClick={() => {
            console.log('save changes', update, item, updateItemAction)
            updateItemAction({
              update,
              onSuccess: () => setIsDirty(false),
            })
          }}
          >
          Save Changes
        </button>
      }

      { editable && <Inspect item={update} /> }
    </div>
  )
}
