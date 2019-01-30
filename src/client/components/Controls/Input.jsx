import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

const valueOnly = (fn) => (e) => fn(e.target.value)

export const Input = ({
  value,
  placeholder,
  onChange,
  className,
  ...props,
}) =>
  <div className="input-group">
    <input
      autocomplete
      className={classNames('input', className)}
      type="text"
      onChange={valueOnly(onChange)}
      value={value}
      placeholder={placeholder}
      {...props}
      />
    {
      placeholder
      ? <label>{ placeholder }</label>
      : null
    }
  </div>

export default observer(Input)
