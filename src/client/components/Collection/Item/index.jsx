import React from 'react'
import { Link } from '@reach/router'
import Imager from 'common/Imager'

export default function GridItem({ item, id }) {
  return (
    <article>
      <Link to={`/${id}`}>
        <Imager
          id={id}
          width={400}
          height={400}
          />
        <label><span>{ item.name }</span></label>
      </Link>
    </article>
  )
}
