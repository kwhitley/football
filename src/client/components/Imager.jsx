import React from 'react'
import ImageService from '../services/images.js'
import { observer, inject } from 'mobx-react'
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

@observer class Image extends React.Component {
  componentWillMount() {
    let { width, height, quality, id } = this.props
    let params = []

    if (width) params.push(`width=${width}`)
    if (height) params.push(`height=${height}`)
    if (quality) params.push(`quality=${quality}`)

    this.path = `/i/${id}::${params.join(',')}.jpg`
  }

  componentWillUnmount() {
    ImageService.unload(this.path)
  }

  render() {
    let src = ImageService.getImage(this.path)

    return src ? <img src={src} /> : <Loading />
  }
}

export default Image
