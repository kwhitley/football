import React, { useState, useEffect } from 'react'
import md from 'react-markings'

import LiveEdit from '../../Controls/LiveEdit'
import Input from '../../Controls/Input'
import Inspect from '../../Controls/Inspect'

export default function ImageDetails({ item }) {
  let [ details, setDetails ] = useState(item)

  return (
    <div className="image-details">
      <h1>{ item.name }</h1>
      <div className="story">
        { md([item.story]) }
      </div>

      <LiveEdit
        className="h1"
        value={details.name}
        onChange={name => setDetails({ ...details, name })}
        placeholder="Image Title"
        />

      <Inspect item={details} />
    </div>
  )
}

  // <div className="image-details">
  //     {
  //       app.editMode
  //       ? <LiveEdit
  //           className="h1 title"
  //           value={image.name}
  //           onChange={image.set('name')}
  //           placeholder="Give the image a title"
  //           />
  //       : <h1>{ image.name }</h1>
  //     }

  //     {
  //       app.editMode
  //       ? <LiveEdit
  //           className="story"
  //           value={image.story}
  //           onChange={image.set('story')}
  //           placeholder="Tell the story"
  //           />
  //       : <div className="story">
  //           { md([image.story]) }
  //         </div>
  //     }

  //     {
  //       app.editMode && image.isDirty
  //       ? <button
  //           className="save"
  //           onClick={image.save}
  //           >
  //           Save Changes
  //         </button>
  //       : null
  //     }
  //   </div>
  // )
