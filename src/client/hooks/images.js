import { useState, useEffect } from 'react'
import { useStore } from './store'

const getOrientation = (image) => image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  const keyPath = path.replace(/^([^\:]+).*(\.jpg|png)$/, '$1')
  let [ isLoaded, setIsLoaded ] = useStore(previewPath, false)
  let [ src, setSrc ] = useStore(path, undefined)
  let [ orientation, setOrientation ] = useStore(path+':orientation', 'landscape')

  useEffect(() => {
    if (!src) {
      let image = new Image()
      image.onload = () => {
        setSrc(previewPath)

        let newOrientation = getOrientation(image)
        if (newOrientation !== orientation) {
          setOrientation(newOrientation)
        }

        image.onload = () => {
          setSrc(path)

          let newOrientation = getOrientation(image)
          if (newOrientation !== orientation) {
            setOrientation(newOrientation)
          }
        }
        image.src = path
      }
      image.src = previewPath
    }
  }, [])

  return {
    src,
    orientation,
  }
}
