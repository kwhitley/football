import React from 'react'
import classNames from 'classnames'
import Item from './Item'

export default function Grid({ collection }) {
  let gridScale = undefined
  let { items } = collection

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
            key={item.hash}
            collection={collection}
            item={item}
            />
        )
      }
    </div>
  )
}
