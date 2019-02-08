import React from 'react'
import { Link } from '@reach/router'

export default function CollectionsNav({ collections }) {
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
