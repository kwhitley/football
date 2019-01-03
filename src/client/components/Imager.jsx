import React from 'react'



const Imager = ({
  src,
  width,
  height,
  quality,
  ...props,
}) => {
  let params = []

  if (width) params.push(`width=${width}`)
  if (height) params.push(`height=${height}`)
  if (quality) params.push(`quality=${quality}`)

  let previewPath = src.replace(/^(.*)\.(\w{3,4})$/, `$1::${params.join(',')}.$2`)

  return (
    <img src={previewPath} />
  )
}

Imager.defaultProps = {
  quality: 80,
  width: 1000,
}

export default Imager
