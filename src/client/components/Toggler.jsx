import React from 'react'

/*
  This is a "stateless functional component", one of the simplest building blocks
  of a React app.  It tracks no internal state, and re-renders itself whenever one of its
  props changes.

  Ultimately, one should aim to build their app from as many small stateless components as
  logically makes sense, to allow React to optimally handle re-renders (easier with small components)
  that only accept a few relevant props).
*/
const Toggler = ({ value, clickHandler }) =>
  <a className="toggler" onClick={clickHandler}>
    { value ? 'are' : 'are not' }
  </a>

export default Toggler
