import React from 'react'
import { observer } from 'mobx-react'
import GridItem from './GridItem'

export const Grid = ({ items }) =>
  <section className="grid">
    {
      items.map((item, index) =>
        <GridItem
          key={item.id}
          item={item}
          />
      )
    }
  </section>

export default observer(Grid)

