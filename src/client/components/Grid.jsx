import React, { h, Component } from 'react'
import { observer } from 'mobx-react'
import GridItem from './GridItem'

export const Grid = ({ items }) =>
  <div className="grid">
    {
      items.map((item, index) =>
        <GridItem
          key={item.id}
          item={item}
          />
      )
    }
  </div>

export default observer(Grid)

