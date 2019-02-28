import React from 'react'
import classNames from 'classnames'
import Item from './Item'

export default function Grid({ collectionId, items }) {
  let gridScale = undefined

  if (items.length < 8) {
    gridScale = 'some'
  }

  if (items.length < 4) {
    gridScale = 'few'
  }

  return (
    <div className={classNames('grid', gridScale)}>
      {
        items.map((item, index) =>
          <Item
            key={item.id}
            id={collectionId + '/' + item.id}
            item={item}
            />
        )
      }
    </div>
  )
}
