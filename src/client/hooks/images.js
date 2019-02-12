import { useState, useEffect } from 'react'
import { useStore } from './store'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  let [ isLoaded, setIsLoaded ] = useStore(previewPath, false)
  let [ src, setSrc ] = useState(isLoaded ? path : previewPath)
  let [ orientation, setOrientation ] = useState('landscape')

  useEffect(() => {
    if (!isLoaded) {
      let image = new Image()
      image.onload = () => {
        // console.log('loaded preview', previewPath)
        image.src = path
        image.onload = () => {
          // console.log('loaded full image', path)
          setIsLoaded(true)
          setSrc(path)
        }
        setOrientation(image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape')
      }
      image.src = previewPath
    }
  }, [path])

  return {
    src,
    orientation,
  }
}
