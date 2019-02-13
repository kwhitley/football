import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Page from 'common/Page'
import Inspect from 'common/Inspect'
import LiveEdit from 'common/LiveEdit'

export default ({ children, className, ...props }) => {
  let [ item1, setItem1 ] = useState('')
  let [ item2, setItem2 ] = useState('')
  let [ stats, setStats ] = useState({})

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
    })
  }

  useEffect(() => {
    onResize()
    console.log('adding event listener')
    window.addEventListener('resize', onResize)
    return () => {
      console.log('removing event listener')
      window.removeEventListener('resize', onResize)
    }
  }, [])


  let docEl = document.documentElement
  let foo = {
    item1,
    stats,
    ontouchstart: 'ontouchstart' in docEl,
  }

  return (
    <Page className="sandbox" style={{ padding: '1rem' }}>
      <LiveEdit
        value={item1}
        onChange={setItem1}
        placeholder="set item 1"
        />

      <Inspect item={foo} />

      <LiveEdit
        value={item2}
        onChange={setItem2}
        placeholder="set item 2"
        />
    </Page>
  )
}
