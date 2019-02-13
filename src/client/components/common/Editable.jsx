import React from 'react'
import LiveEdit from './LiveEdit'

export default function Editable({
  placeholder,
  className,
  value,
  editing = false,
  onChange,
  children,
  ...props,
}) {
  if (!editing) {
    return children
  }

  return (
    <LiveEdit
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      />
  )
}
