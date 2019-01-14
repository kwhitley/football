import React from 'react'
import { observer } from 'mobx-react'
import GridItem from './GridItem'
import styled from 'styled-components'

const StyledSection = styled.div`
  border-radius: 0.2em;
  overflow: hidden;
`

export const Grid = ({ items }) =>
  <StyledSection className="grid">
    {
      items.map((item, index) =>
        <GridItem
          key={item.id}
          item={item}
          />
      )
    }
  </StyledSection>

export default observer(Grid)

