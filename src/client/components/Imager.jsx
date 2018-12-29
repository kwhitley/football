import React from 'react'

export default ({
  src
}) => {
  let previewPath = src.replace(/^(.*)\.(\w{3,4})$/, '$1::width=300,height=300.$2')

  return (
    <img src={previewPath} width="100%" />
  )
}
