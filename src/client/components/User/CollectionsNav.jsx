import React from 'react'
import { observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

export const CollectionsNav = ({ collections }) => {
  return (
    <div className="collections">
      <h1>My Collections</h1>
      <nav className="horizontal">
        {
          collections.map(c =>
            <NavLink
              key={c._id}
              className="collection"
              to={`/${c.slug}`}
            >
              { c.name || c.slug }
            </NavLink>
          )
        }
        <NavLink className="create" to="/collections/create">Create New</NavLink>
      </nav>
    </div>
  )
}

export default observer(CollectionsNav)
