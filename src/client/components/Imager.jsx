import React from 'react'
import ImageService from '../services/images.js'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const Loading = styled.div`
  background-color: #eee;
  height: 100%;
  text-align: center;
  position: relative;

  &:after {
    color: #333;
    opacity: 0.2;
    content: ' loading...';
    display: block;
    position: absolute;
    top: 40%;
    width: 100%;
  }
`

const Image = ({ width, height, quality, id }) => {
  let params = []

  if (width) params.push(`width=${width}`)
  if (height) params.push(`height=${height}`)
  if (quality) params.push(`quality=${quality}`)

  let path = `/i/${id}::${params.join(',')}.jpg`
  let src = ImageService.getImage(path)

  return src ? <img src={src} /> : <Loading />
}

export default observer(Image)
