import React from 'react'
import { inject, observer } from 'mobx-react'
import Imager from './Imager'
import { NavLink } from 'react-router-dom'

export const GridItem = ({ app, item }) =>
  <article>
    <NavLink to={`/view/${item.id}`}>
      <Imager
        id={item.id}
        width={400}
        height={400}
        />
      <label><span>{ item.name }</span></label>
    </NavLink>
  </article>

export default inject('app')(observer(GridItem))
