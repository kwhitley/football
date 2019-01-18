import React, { h, Component } from 'react'
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
  <TextArea
    className={classNames('live-edit', className)}
    // onKeyDown={this.checkForEnter}
    type="text"
    onChange={valueOnly(onChange)}
    value={value}
    placeholder={placeholder}
    {...props}
    />

export default observer(LiveEdit)
