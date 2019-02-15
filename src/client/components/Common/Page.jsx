import React from 'react'
import classNames from 'classnames'
import Back from 'Common/Back'

export default ({ children, visible = true, className, back, style, ...props }) => {
  return (
    <div
      className={classNames('page', className)}
      style={style}
    >
      { back && <Back {...props} /> }
      { visible && children }
    </div>
  )
}
