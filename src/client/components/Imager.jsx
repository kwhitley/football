import React from 'react'

export default ({
  src
}) => {
  let previewPath = src.replace(/^(.*)\.(\w{3,4})$/, '$1::width=400,height=400,quality=90.$2')

  return (
    <img src={previewPath} />
  )
}
