import React from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

export const CollectionsNav = ({ collections }) => {
  return (
    <div className="collections">
      <h1>
        My Collections
        <small>
          <NavLink to="/collections/create">+</NavLink>
        </small>
      </h1>
      <div className="nav horizontal">
        {
          collections.map(c =>
            <NavLink
              key={c._id}
              className="collection"
              to={`/collections/${c.slug}`}
            >
              { c.name || c.slug }
            </NavLink>
          )
        }
      </div>
    </div>
  )
}

export default observer(CollectionsNav)
