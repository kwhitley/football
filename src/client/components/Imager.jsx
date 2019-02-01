import React, { Component } from 'react'
import ImageService from '../services/images.js'
import { observer, inject } from 'mobx-react'

@observer class Image extends Component {
  componentWillMount() {
    let { width, height, quality, id, collection } = this.props
    let params = []

    if (width) params.push(`width=${width}`)
    if (height) params.push(`height=${height}`)
    if (quality) params.push(`quality=${quality}`)

    this.path = `/i/${collection}/${id}::${params.join(',')}.jpg`
  }

  componentWillUnmount() {
    ImageService.unload(this.path)
  }

  render() {
    let src = ImageService.getImage(this.path)

    return src ? <img src={src} /> : <div className="loading" />
  }
}

export default Image
