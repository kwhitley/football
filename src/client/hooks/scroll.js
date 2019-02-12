import { useState, useEffect } from 'react'
import { useStore } from './store'

const getY = () => {
  const doc = document.documentElement
  return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
}

const restoreIfReady = (y) => {
  let height = document.documentElement.scrollHeight

  if (height >= y) {
    window.scrollTo(0, y)
  } else {
    setTimeout(() => restoreIfReady(y), 10)
  }
}

export function useScrollTracking() {
  let [ y, setY ] = useStore('y-position', 0)
  const listener = () => setY(getY())

  useEffect(() => {
    window.addEventListener('scroll', listener)
    if (y > 0) {
      restoreIfReady(y)
    }

    // cleanup
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])
}
