import { useState, useEffect } from 'react'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  let [ src, setSrc ] = useState(previewPath)

  useEffect(() => {
    let image = new Image()
    image.onload = setSrc(path)
  }, [path])

  return src
}
