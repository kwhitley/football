import React from 'react'
import styled from 'styled-components'

const BackButtonContainer = styled.div`
  padding: 1em;
  background: #ddd;
  cursor: pointer;
  margin-bottom: 0.2em;
  position: relative;
  border-radius: 0.2em;
  color: white;

  &:before {
    content: '\\2039';
    font-size: 2em;
    line-height: 0;
    position: relative;
    bottom: -0.1em;
    margin-right: 0.1em;
  }

  &:hover {
    background-color: #ccc;
  }
`

export const Back = ({ history, location }) =>
  location.pathname !== '/' &&
  <BackButtonContainer onClick={history.goBack}>
    Go Back
  </BackButtonContainer>

export default Back
