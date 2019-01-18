import React, { h, Component } from 'react'
import { inject, observer } from 'mobx-react'
import { MarkdownPreview } from 'react-marked-markdown'
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
      : <MarkdownPreview
          className="story"
          value={image.story}
          markedOptions={{
            sanitize: false,
          }}
          />
    }
  </div>

export default inject('app')(observer(ImageDetails))
