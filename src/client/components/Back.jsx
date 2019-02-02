import React from 'react'

export const Back = ({ history, location }) => {
  // console.log('Back:history', history, location)
  return <div className="back" onClick={history.goBack} />
}

export default Back
