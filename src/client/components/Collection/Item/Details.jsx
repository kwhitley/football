import React, { useState, useEffect } from 'react'
import md from 'react-markings'
import classNames from 'classnames'
import { FiEdit, FiEye } from 'react-icons/fi'

import LiveEdit from '../../Controls/LiveEdit'
import Input from '../../Controls/Input'
import Inspect from '../../Controls/Inspect'
import { ActionIcon, ActionIconToggle } from '../../Controls/ActionIcons'
import { ownsCollection } from '../../../hooks'

const useUpdate = ({ item, path }) => {
  let [ update, setUpdate ] = useState(item)
  let [ isDirty, setIsDirty ] = useState(false)

  useEffect(() => {
    if (update !== item) {
      setIsDirty(true)
    }
  }, [update])

  return {
    update, setUpdate, isDirty
  }
}

export function Editable({
  placeholder,
  className,
  value,
  editing = false,
  onChange,
  children,
  ...props,
}) {
  // let { update, setUpdate, isDirty } = useUpdate({
  //   item: value,
  //   // path: `/api/collections/${collectionId}/items/${item.id}`,
  // })

  console.log('creating Editable', value)
  if (!editing) {
    return children
  }

  return (
    <LiveEdit
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      />
  )
}

export default function ImageDetails({ collectionId, item, updateItemAction }) {
  let { update, setUpdate, isDirty } = useUpdate({
    item,
    path: `/api/collections/${collectionId}/items/${item.id}`,
  })
  let [ preview, setPreview ] = useState('false')
  const togglePreview = () => setPreview(!preview)

  // let [ update, setUpdate ] = useState(item)
  let isOwner = ownsCollection(collectionId)
  let editable = !preview && isOwner

  return (
    <div className="image-details">
      <div className="actions">
        <ActionIconToggle
          onClick={togglePreview}
          state={preview}
          states={{
            [true]: <FiEye />,
            [false]: <FiEdit />,
          }}>
        </ActionIconToggle>
      </div>

      <div className="content">
        <Editable
          className="h1"
          placeholder="Image Title"
          value={update.name}
          onChange={name => setUpdate({ ...update, name })}
          editing={editable}
          >
          <h1>{ update.name }</h1>
        </Editable>

        <Editable
          className="story"
          placeholder="Story or Description"
          value={update.story}
          onChange={story => setUpdate({ ...update, story })}
          editing={editable}
          >
          <div className="story">
            { md([update.story]) }
          </div>
        </Editable>
      </div>




{/*}
      {
        editable
        ? <LiveEdit
            className="h1"
            value={update.name}
            onChange={name => {
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
              setUpdate({ ...update, story })
            }}
            placeholder="Story or Description"
            />
        : <div className="story">
            { md([item.story]) }
          </div>
      }
*/}
      {
        editable &&
        <button
          disabled={!isDirty}
          onClick={() => {
            console.log('save changes', update, item, updateItemAction)
            updateItemAction({
              update,
              // onSuccess: () => setIsDirty(false),
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
