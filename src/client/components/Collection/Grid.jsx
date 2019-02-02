import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import Item from './Item'

export const Grid = ({ items, collection }) =>
  <div className={classNames('grid', `items${items.length}`)}>
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

export default observer(Grid)

