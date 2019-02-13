import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Page from 'common/Page'
import Inspect from 'common/Inspect'
import LiveEdit from 'common/LiveEdit'
import Input from 'common/Input'

export default ({ children, className, ...props }) => {
  let [ item1, setItem1 ] = useState('')
  let [ item2, setItem2 ] = useState('')
  let [ stats, setStats ] = useState({})
  let ref = useRef(null)

  const onResize = () => {
    let docEl = document.documentElement
    let screen = window.screen
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
    })
  }

  useEffect(() => {
    setInterval(onResize, 20)
    return () => {
      clearInterval(onResize)
    }
  }, [])


  let docEl = document.documentElement
  let foo = {
    item1,
    stats,
    ontouchstart: 'ontouchstart' in docEl,
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

      <input
        ref={ref}
        value={item2}
        onChange={e => setItem2(e.target.value)}
        placeholder="set item 2"
        />
    </Page>
  )
}
