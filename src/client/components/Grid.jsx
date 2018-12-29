import React from 'react'
import { observer } from 'mobx-react'

export const Grid = ({ items }) =>
  <section className="grid">
    {
      items.map(item =>
        <article key={item.content_hash}>
          { item.name }
          <img src={`/i${item.path_display}`} />
        </article>
      )
    }
  </section>

export default observer(Grid)

