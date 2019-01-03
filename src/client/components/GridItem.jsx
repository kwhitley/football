import React from 'react'
import { observer } from 'mobx-react'
import Imager from './Imager'
import { NavLink } from 'react-router-dom'

export const GridItem = ({ item }) =>
  <article>
    <label>{ item.filename }</label>
    <NavLink to={`/view/${item.id}`}>
      <Imager
        src={`/i/${item.id}.jpg`}
        width={400}
        height={400}
        quality={90}
        />
    </NavLink>
  </article>

export default observer(GridItem)
