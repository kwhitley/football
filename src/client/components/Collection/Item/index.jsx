import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from '@reach/router'
import Imager from '../../Imager'

export const GridItem = ({ app, item, collection }) =>
<article>{ JSON.stringify(item) }</article>
  <article>
    <Link to={`/${collection.slug}/${item.id}`}>
      <Imager
        id={item.id}
        collection={collection.slug}
        width={400}
        height={400}
        />
      <label><span>{ item.name }</span></label>
    </Link>
  </article>

export default inject('app')(observer(GridItem))
