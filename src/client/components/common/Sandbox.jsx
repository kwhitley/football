import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Page from 'common/Page'
import Inspect from 'common/Inspect'
import LiveEdit from 'common/LiveEdit'
import Input from 'common/Input'
import { useKeyboardSpacing } from 'hooks'

export default ({ children, className, ...props }) => {
  let [ item1, setItem1 ] = useState('')
  let [ item2, setItem2 ] = useState('')
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
