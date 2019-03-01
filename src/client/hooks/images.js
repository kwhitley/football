import { useState, useEffect } from 'react'
import { useStore } from './store'

const SOURCE_PATH = process.env.CDN_PATH || ''

const getOrientation = (image) => image.naturalHeight > image.naturalWidth
                                  ? 'portrait'
                                  : 'landscape'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  let [ src, setSrc ] = useStore(path+':src', undefined, { persist: true })
  let [ orientation, setOrientation ] = useStore(path+':orientation', 'landscape', { persist: true })

  useEffect(() => {
    if (!src) {
      let image = new Image()
      image.onload = () => {
        setSrc(SOURCE_PATH + previewPath)

        let newOrientation = getOrientation(image)

        if (newOrientation !== orientation) {
          setOrientation(newOrientation)
        }

        image.onload = () => {
          setSrc(SOURCE_PATH + path)

          let newOrientation = getOrientation(image)
          if (newOrientation !== orientation) {
            setOrientation(newOrientation)
          }
        }
        image.src = SOURCE_PATH + path
      }
      image.src = SOURCE_PATH + previewPath
    }
  }, [path])

  return {
    src,
    orientation,
  }
}
