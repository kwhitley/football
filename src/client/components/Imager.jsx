import React, { Component } from 'react'
import { useImageWithPreview } from '../hooks'

export default function Image({ id, alt, width, height, quality }) {
  const params = []
  if (width) params.push(`width=${width}`)
  if (height) params.push(`height=${height}`)
  if (quality) params.push(`quality=${quality}`)

  const src = useImageWithPreview(`/i/${id}::${params.join(',')}.jpg`)

  return (
    <img src={src} alt={alt} />
  )
}

export default Image
