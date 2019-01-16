import React from 'react'
import { observer } from 'mobx-react'
import Imager from './Imager'
import { NavLink } from 'react-router-dom'

export const GridItem = ({ item }) =>
  <article>
    <div className="content">
      <label>{ item.filename }</label>
      <NavLink to={`/view/${item.id}`}>
        <Imager
          id={item.id}
          width={400}
          height={400}
          />
      </NavLink>
    </div>
  </article>

export default observer(GridItem)
