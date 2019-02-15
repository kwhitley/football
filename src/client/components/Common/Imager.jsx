import React, { Component } from 'react'
import { useImageWithPreview } from 'hooks'

export default function Image({ id, ...props }) {
  const params = Object.keys(props).map(k => `${k}=${props[k]}`)
  const { src, orientation } = useImageWithPreview(`/i/${id}::${params.join(',')}.jpg`)

  return (
    <i className={'imager ' + orientation}>
      { src && <img src={src} /> }
    </i>
  )
}

export default Image
