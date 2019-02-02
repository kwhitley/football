import React from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import Imager from '../../Imager'

export const GridItem = ({ app, item, collection }) =>
  <article>
    <NavLink to={`/${collection.slug}/${item.id}`}>
      <Imager
        id={item.id}
        collection={collection.slug}
        width={400}
        height={400}
        />
      <label><span>{ item.name }</span></label>
    </NavLink>
  </article>

export default inject('app')(observer(GridItem))