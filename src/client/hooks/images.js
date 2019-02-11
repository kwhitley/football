import { useState, useEffect } from 'react'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  let [ src, setSrc ] = useState(previewPath)
  let [ orientation, setOrientation ] = useState('landscape')

  useEffect(() => {
    let image = new Image()
    image.onload = () => {
      setSrc(path)
      setOrientation(image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape')
    }
    image.src = previewPath
  }, [path])

  return {
    src,
    orientation,
  }
}
