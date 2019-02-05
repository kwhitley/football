import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import TextArea from 'react-autosize-textarea'

const valueOnly = (fn) => (e) => fn(e.target.value)

export const LiveEdit = ({
  value,
  placeholder,
  onChange,
  className,
  ...props,
}) =>
  <div className="input-group">
    <textarea
      className={classNames('live-edit', className)}
      onChange={valueOnly(onChange)}
      value={value || ''}
      placeholder={placeholder}
      {...props}
      />
    <label>{ placeholder }</label>
  </div>

export default observer(LiveEdit)
