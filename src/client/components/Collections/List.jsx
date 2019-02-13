import React from 'react'
import { Link } from '@reach/router'
import Page from 'common/Page'
import { useLogin, useStore, requireLogin } from 'hooks'
import List from './List'

export default function CollectionsList({ location, navigate }) {
  let isLoggedIn = requireLogin(location)
  let [ user ] = useStore('user')

  if (!isLoggedIn) {
    return false
  }

  let { collections } = user.profile

  return (
    <Page className="form collections-list">
      <h1>Collections</h1>
      {
        collections.map(c =>
          <Link
            key={c._id}
            to={'/' + c.slug}
          >
            { c.name || c.slug }
          </Link>
        )
      }
      <Link className="create" to="create">Create New</Link>
    </Page>
  )
}
