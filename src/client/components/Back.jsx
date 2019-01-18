import React, { h, Component } from 'react'

export const Back = ({ history, location }) =>
  location.pathname !== '/' &&
  <div className="back" onClick={history.goBack} />

export default Back
