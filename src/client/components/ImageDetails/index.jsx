import React from 'react'
import { inject, observer } from 'mobx-react'
import md from 'react-markings'
import LiveEdit from '../Controls/LiveEdit'

export const ImageDetails = ({ app, image, editing }) =>
  <div className="image-details">
    {
      app.editMode
      ? <LiveEdit
          className="h1 title"
          value={image.name}
          onChange={image.set('name')}
          placeholder="Give the image a title"
          />
      : <h1>{ image.name }</h1>
    }

    {
      app.editMode
      ? <LiveEdit
          className="story"
          value={image.story}
          onChange={image.set('story')}
          placeholder="Tell the story"
          rows={3}
          />
      : <div className="story">
          { md([image.story]) }
        </div>
    }

    {
      app.editMode && image.isDirty
      ? <button
          className="save"
          onClick={image.save}
          >
          Save Changes
        </button>
      : null
    }
  </div>

export default inject('app')(observer(ImageDetails))
