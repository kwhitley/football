import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { useStore } from 'hooks'

export function useOrientationAngle() {
  let [ orientationAngle, setOrientationAngle ] = useStore('orientation', screen.orientation.angle)

  useEffect(() => {
    const orientationListener = () => {
      let angle = 'orientation' in window
                ? window.orientation
                : (screen.orientation ? screen.orientation.angle : undefined)

      setOrientationAngle(angle)
    }

    console.log('adding orientationListener')
    window.addEventListener('orientationchange', orientationListener)

    return () => {
      console.log('removing orientationListener')
      window.removeEventListener('orientationchange', orientationListener)
    }
  }, [])

  return orientationAngle
}

export function useDeviceEnvironment() {
  // let orientationAngle = useOrientationAngle()
  let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
  let isMobileChrome = !!navigator.userAgent.match('CriOS')
  let isTouch = 'ontouchstart' in document.documentElement
  // let isPortrait = orientationAngle === 0
  // let isLandscape = !isPortrait

  return {
    isChrome,
    isMobileChrome,
    isTouch,
    // isPortrait,
    // isLandscape,
    // orientationAngle,
  }
}

export function useKeyboardSpacing() {
  let [ spacer, setSpacer ] = useState(0)
  let [ isFocused, setIsFocused ] = useStore('focus', false)
  let { isMobileChrome, isTouch } = useDeviceEnvironment()

  useEffect(() => {
    let newSpacer = 0

    if (isTouch && isMobileChrome && isFocused) {
      newSpacer = '50vh'
    } else {
      newSpacer = 0
    }

    // prevent unnecessary setting of state to same value
    if (newSpacer !== spacer) {
      setSpacer(newSpacer)
    }
  }, [isTouch, isMobileChrome, isFocused])

  return { isFocused, spacer }
}

export function useFocus(ref) {
  let [ isFocused, setIsFocused ] = useStore('focus', false)

  useEffect(() => {
    let el = ref.current

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
  }, [ref.current])
}
