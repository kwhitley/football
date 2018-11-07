import React from 'react'

const Toggler = ({ value, clickHandler }) =>
  <a className="toggler" onClick={clickHandler}>
    { value ? 'are' : 'are not' }
  </a>

export default Toggler
