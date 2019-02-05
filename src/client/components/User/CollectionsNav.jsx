import React from 'react'
import { observer } from 'mobx-react'
import { Link } from '@reach/router'
import Inspect from '../Controls/Inspect'

export const CollectionsNav = ({ collections }) => {
  return (
    <div className="collections">
      <h1>My Collections</h1>
      <nav className="horizontal">
        {
          collections.map(c =>
            <Link
              key={c._id}
              className="collection"
              to={`/${c.slug}`}
            >
              { c.name || c.slug }
            </Link>
          )
        }
        <Link className="create" to="/create-collection">Create New</Link>
      </nav>
    </div>
  )
}

export default observer(CollectionsNav)
