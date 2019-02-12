import React, { useState, useEffect } from 'react'
import md from 'react-markings'
import classNames from 'classnames'
import { FiEdit, FiShare, FiEye } from 'react-icons/fi'

import Inspect from '../../Controls/Inspect'
import Editable from '../../Controls/Editable'
import { ActionIcon, ActionIconToggle } from '../../Controls/ActionIcons'
import { useStore, useUpdate, ownsCollection } from '../../../hooks'

export default function ImageDetails({ collectionId, isOwner, item }) {
  let { update, setUpdate, isDirty, updateAction } = useUpdate({
    path: `/api/collections/${collectionId}/items/${item.id}`,
    item,
  })
  let [ editModeEnabled, setEditModeEnabled ] = useStore('editMode', false, { persist: true })
  let editMode = editModeEnabled && isOwner
  let noContent = !item.story && !item.name
  const toggleEditMode = () => setEditModeEnabled(!editMode)

  return (
    <div className="image-details">
      {
        isOwner &&
        <div className="actions">
          <ActionIconToggle
            onClick={toggleEditMode}
            state={editMode}
            states={{
              [true]: <FiEye />,
              [false]: <FiEdit />,
            }}>
          </ActionIconToggle>
          <ActionIcon
            onClick={updateAction}
            disabled={!isDirty}
            >
            <FiShare />
          </ActionIcon>
        </div>
      }

      <div className="content">
        <Editable
          className="h1"
          placeholder="Image Title"
          value={update.name}
          onChange={name => setUpdate({ ...update, name })}
          editing={editMode}
          >
          <h1>{ update.name }</h1>
        </Editable>

        <Editable
          className="story"
          placeholder="Story or Description"
          value={update.story}
          onChange={story => setUpdate({ ...update, story })}
          editing={editMode}
          >
          <div className="story">
            { md([update.story]) }
          </div>
        </Editable>

        {
          noContent &&
          <div className="no-content">
            Imagine all the possible stories behind this image...
          </div>
        }
      </div>
    </div>
  )
}
