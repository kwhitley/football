import React from 'react'
import ImageService from '../services/images.js'
import { observer } from 'mobx-react'

const Image = ({ width, height, quality, id }) => {
  let params = []

  if (width) params.push(`width=${width}`)
  if (height) params.push(`height=${height}`)
  if (quality) params.push(`quality=${quality}`)

  let path = `/i/${id}::${params.join(',')}.jpg`

  return <img src={ImageService.getImage(path)} />
}

export default observer(Image)
