import React from 'react'
import classNames from 'classnames'
import Back from './Back'

export default ({ children, visible = true, className, back, ...props }) => {
  return (
    <div className={classNames('page', className)}>
      { back && <Back {...props} /> }
      { visible && children }
    </div>
  )
}
