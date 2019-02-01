import React from 'react'
import { observer } from 'mobx-react'
import GridItem from './GridItem'

export const Grid = ({ items, collection }) =>
  <div className="grid">
    {
      items.map((item, index) =>
        <GridItem
          key={item.id}
          collection={collection}
          item={item}
          />
      )
    }
  </div>

export default observer(Grid)

