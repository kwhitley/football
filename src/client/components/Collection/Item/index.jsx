import React from 'react'
import { Link } from '@reach/router'
import Imager from '../../Imager'

export default function GridItem({ item }) {
  return (
    <article>
      <Link to={`/${item.key}`}>
        <Imager
          id={item.key}
          width={400}
          height={400}
          alt={item.name}
          />
        <label><span>{ item.name }</span></label>
      </Link>
    </article>
  )
}
