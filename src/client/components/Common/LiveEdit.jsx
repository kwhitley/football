import React, { useEffect, useRef, memo } from 'react'
import classNames from 'classnames'
import { useAutoResize, useFocus } from 'hooks'

const valueOnly = fn => e => fn(e.target.value)

export default memo(function LiveEdit({
  value,
  placeholder,
  onChange,
  className,
  ...props,
}) {
  let ref = useRef(null)
  useAutoResize(ref)
  useFocus(ref)

  return (
    <div className="input-group">
      <textarea
        ref={ref}
        className={classNames('live-edit', className)}
        onChange={valueOnly(onChange)}
        value={value || ''}
        placeholder={placeholder}
        {...props}
        />
      <label>{ placeholder }</label>
    </div>
  )
})
