import React from 'react'

export const Back = ({ navigate, to = '../' }) => {
  const goBack = () => navigate(to)
  return <div className="back" onClick={goBack} />
}

export default Back
