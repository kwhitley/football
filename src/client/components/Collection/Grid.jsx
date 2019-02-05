import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import Item from './Item'

export const Grid = ({ collection }) => {
  let items = collection.items.sorted

  console.log('Grid loaded', collection)
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
            collection={collection}
            item={item}
            />
        )
      }
    </div>
  )
}

export default inject('collection')(observer(Grid))

