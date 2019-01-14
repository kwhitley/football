import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import Imager from './Imager'

let Wrapper = styled.div`
  padding: 0.50rem;

  img {
    max-width: 100%;
    width: 100%;
  }
`

let PreStyled = styled.pre`
  padding: 1.5em;
  font-size: 0.7em;
`

export const Viewer = ({ images, match }) =>
  <Wrapper>
    <Imager id={match.params.id} width={1000} />
    <PreStyled>{ JSON.stringify(images.getById(match.params.id), null, 2) }</PreStyled>
  </Wrapper>

export default inject('images')(observer(Viewer))
