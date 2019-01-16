import React from 'react'
import { observer, inject } from 'mobx-react'
import Imager from './Imager'

export const Viewer = ({ images, match }) =>
  <div className="viewer">
    <Imager id={match.params.id} width={1000} />
  </div>

export default inject('images')(observer(Viewer))
