import React from 'react'

export const Back = ({ history, location }) => {
  console.log('Back:history', history)
  return location.pathname !== '/' &&
    <div className="back" onClick={history.goBack} />
}


export default Back
