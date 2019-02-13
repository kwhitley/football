import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useStore } from 'hooks'

export function useKeyboardSpacing() {
  let [ spacer, setSpacer ] = useState(0)
  let [ isFocused, setIsFocused ] = useStore('focus', false)
  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  var isTouch = 'ontouchstart' in document.documentElement

  useEffect(() => {
    let newSpacer = 0

    if (isTouch && isChrome && isFocused) {
      newSpacer = '50vh'
    } else {
      newSpacer = 0
    }

    // prevent unnecessary setting of state to same value
    if (newSpacer !== spacer) {
      setSpacer(newSpacer)
    }
  }, [isTouch, isChrome, isFocused])
  console.log('useKeyboardSpacing', { isTouch, isChrome, isFocused })

  return { isTouch, isChrome, isFocused, spacer }
}

const myScript = () => {

}

export function useFocus(ref) {
  let [ isFocused, setIsFocused ] = useStore('focus', false)
  // console.log('ref', ref.current)
  let el = ref.current

  useEffect(() => {
    console.log('useFocus:useEffect')
    let onFocus = () => {
      console.log('focused')
      setIsFocused(true)
    }

    let onBlur = () => {
      console.log('blurred')
      setIsFocused(false)
    }

    if (el) {
      console.log('adding event listeners')
      el.addEventListener('focus', onFocus)
      el.addEventListener('blur', onBlur)
    } else {
      console.log('el not ready')
    }

    return () => {
      if (el) {
        console.log('removing event listeners')
        // el.removeEventListener('focus', onFocus)
        // el.removeEventListener('blur', onBlur)
      }
    }
  }, [el])
}
