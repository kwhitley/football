import React from 'react'
import { observer } from 'mobx-react'
import Imager from './Imager'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: relative;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .inside {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  img {
    max-width: 100%;
    width: 100%;
  }

  label {
    position: absolute;
    z-index: 1;
    font-size: 2vmin;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.8em 1em;
    background-color: rgba(0,0,0,0.1);
    color: white;
  }
`

export const GridItem = ({ item }) =>
  <article>
    <StyledContainer>
      <div className="inside">
        <label>{ item.filename }</label>
        <NavLink to={`/view/${item.id}`}>
          <Imager
            id={item.id}
            width={400}
            height={400}
            quality={90}
            />
        </NavLink>
      </div>
    </StyledContainer>
  </article>

export default observer(GridItem)
