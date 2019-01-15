import React from 'react'

export const Back = ({ history, location }) =>
  location.pathname !== '/' &&
  <div className="back" onClick={history.goBack}>
    Go Back
  </div>

export default Back
