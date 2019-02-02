import React from 'react'
import classNames from 'classnames'
import Back from './Back'

export default ({ children, className, back, ...props }) => {
  return (
    <div className={classNames('page', className)}>
      { back && <Back {...props} /> }
      { children }
    </div>
  )
}
