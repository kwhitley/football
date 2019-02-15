import { useState, useEffect } from 'react'
import { useStore } from './store'

const CDN_PATH = 'https://cdn.supergeneric.me'

const getOrientation = (image) => image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape'

export function useImageWithPreview(path) {
  const previewPath = path.replace(/^(.*)(\.jpg|png)$/i, '$1,preview$2')
  const keyPath = path.replace(/^([^\:]+).*(\.jpg|png)$/, '$1')
  let [ src, setSrc ] = useStore(path, undefined, { persist: true })
  let [ orientation, setOrientation ] = useStore(path+':orientation', 'landscape')

  useEffect(() => {
    if (!src) {
      let image = new Image()
      image.onload = () => {
        setSrc(CDN_PATH + previewPath)

        let newOrientation = getOrientation(image)
        if (newOrientation !== orientation) {
          setOrientation(newOrientation)
        }

        image.onload = () => {
          setSrc(CDN_PATH + path)

          let newOrientation = getOrientation(image)
          if (newOrientation !== orientation) {
            setOrientation(newOrientation)
          }
        }
        image.src = CDN_PATH + path
      }
      image.src = CDN_PATH + previewPath
    }
  }, [])

  return {
    src,
    orientation,
  }
}
