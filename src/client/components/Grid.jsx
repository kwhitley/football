import React from 'react'
import { observer } from 'mobx-react'
import Imager from './Imager'

export const Grid = ({ items }) =>
  <section className="grid">
    {
      items.map((item, index) =>
        // index !== 2 ? null :
        <article key={item.content_hash}>
          <label>{ item.name }</label>
          <Imager src={`/i${item.path_display}`} />
        </article>
      )
    }
  </section>

export default observer(Grid)

