import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Page from 'common/Page'
import Inspect from 'common/Inspect'
import LiveEdit from 'common/LiveEdit'
import Input from 'common/Input'
import { useKeyboardSpacing } from 'hooks'

export default ({ children, className, ...props }) => {
  let [ item1, setItem1 ] = useState('')
  let [ item2, setItem2 ] = useState('')
  let [ stats, setStats ] = useState({})
  let ref = useRef(null)

  const onResize = () => {
    let docEl = document.documentElement
    let screen = window.screen
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isTouch = 'ontouchstart' in document.documentElement

    let s = {
      availHeight: screen.availHeight,
      height: screen.height,
      availWidth: screen.availWidth,
      width: screen.width
    }
    let w = {
      innerHeight: window.innerHeight,
      outerHeight: window.outerHeight,
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
    }
    let d = {
      clientHeight: docEl.clientHeight,
      scrollHeight: docEl.scrollHeight,
    }

    setStats({
      window: w,
      screen: s,
      document: d,
      liveEditScrollTop: ref.current.scrollTop,
      ref: ref.current.getBoundingClientRect(),
      isChrome,
      isTouch,
    })
  }

  // useEffect(() => {
  //   setInterval(onResize, 20)
  //   return () => {
  //     clearInterval(onResize)
  //   }
  // }, [])

  let keyboard = useKeyboardSpacing()

  let foo = {
    item1,
    keyboard,
    item2,
  }

  return (
    <Page className="sandbox" style={{ padding: '1rem' }}>
      <LiveEdit
        value={item1}
        onChange={setItem1}
        placeholder="set item 1"
        />

      <Inspect item={foo} />

      <p>
        Sed vitae quam elementum, posuere metus quis, placerat tellus. Duis tempor ut nisl et ornare. Ut cursus ultricies tortor, nec ullamcorper nisi lobortis vitae. Sed nulla nisi, ultrices laoreet augue id, gravida sagittis justo. Pellentesque eleifend sapien at congue tristique. Aliquam rhoncus euismod dignissim. Nulla at sem turpis. Integer pretium maximus odio ut iaculis. Duis leo elit, rhoncus ut magna quis, finibus sagittis mi. Donec ultricies luctus ante sit amet scelerisque.
      </p>

      <LiveEdit
        value={item2}
        onChange={setItem2}
        placeholder="set item 2"
        />
    </Page>
  )
}
