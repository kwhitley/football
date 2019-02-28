import React from 'react'
import { Link } from '@reach/router'
import Imager from 'Common/Imager'

export default function GridItem({ item, collection, id }) {
  return (
    <article>
      <Link to={`/${collection.slug}/${item.hash}`}>
        <Imager
          path={item.imagePath}
          width={400}
          height={400}
          />
        <label><span>{ item.name }</span></label>
      </Link>
    </article>
  )
}
