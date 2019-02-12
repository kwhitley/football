import React from 'react'

export default ({ item }) =>
  <pre>{ JSON.stringify(item, null, 2) }</pre>
