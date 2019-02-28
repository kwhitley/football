import React, { useState, useEffect } from 'react'
import md from 'react-markings'
import classNames from 'classnames'
import { FiEdit, FiCheck, FiEye , FiX } from 'react-icons/fi'
import Inspect from 'Common/Inspect'
import Editable from 'Common/Editable'
import { ActionIcon, ActionIconToggle } from 'Common/ActionIcons'
import {
  useStore,
  useUpdate,
  useOwnsCollection,
} from 'hooks'

// used to split story into two columns when appropriate
const longStory = (story = '') => story.length > 1000

export default function ImageDetails({ collectionId, item }) {
  let isOwner = useOwnsCollection(collectionId)
  let { update, setUpdate, isDirty, revertAction, updateAction } = useUpdate({
    path: `/api/collections/${collectionId}/items/${item.hash}`,
    item,
  })
  let [ editModeEnabled, setEditModeEnabled ] = useStore('editMode', true, { persist: true })
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
          {/*<ActionIcon
            onClick={revertAction}
            disabled={!isDirty}
            className="cancel"
            >
            <FiX />
          </ActionIcon>*/}
          <ActionIcon
            onClick={updateAction}
            disabled={!isDirty}
            className="save"
            >
            <FiCheck />
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
          <div className={classNames('story', longStory(update.story) && 'long')}>
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
