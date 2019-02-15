import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Page from 'Common/Page'
import Inspect from 'Common/Inspect'
import LiveEdit from 'Common/LiveEdit'
import Input from 'Common/Input'
import { useKeyboardSpacing, useDeviceEnvironment } from 'hooks'

export default ({ children, className, ...props }) => {
  let [ item1, setItem1 ] = useState('')
  let [ item2, setItem2 ] = useState('')
  let [ item3, setItem3 ] = useState('')
  let keyboard = useKeyboardSpacing()
  let environment = useDeviceEnvironment()

  return (
    <Page className="sandbox" style={{ padding: '1rem' }}>
      <LiveEdit
        value={item1}
        onChange={setItem1}
        placeholder="set item 1"
        />

      <Inspect item={{
        item1,
        keyboard,
        environment,
        item2,
      }} />

      <Input
        value={item3}
        onChange={item3}
        />

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
