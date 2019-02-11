import { useState, useRef, useEffect } from 'react'

export function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    console.log('usePrevious:useEffect')
    ref.current = value
  }, [value])

  return ref.current
}
