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
          placeholder={image.filename}
          />
      : <h1>{ image.name }</h1>
    }

    {
      app.editMode
      ? <LiveEdit
          className="story"
          value={image.story}
          onChange={image.set('story')}
          placeholder="(image story)"
          rows={3}
          />
      : <div className="story">
          { md([image.story]) }
        </div>
    }
  </div>

export default inject('app')(observer(ImageDetails))
