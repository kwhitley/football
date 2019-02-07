import React from 'react'
import classNames from 'classnames'

const valueOnly = (fn) => ({ target }) => {
  let { name, value } = target

  if (name) {
    return fn(target)
  } else {
    return fn(value)
  }
}

export default function Input({ name, value, onChange, label, placeholder, className, ...props }) {
  return (
    <section className="input-group">
      <input
        className={classNames('input', className)}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder || name}
        onChange={valueOnly(onChange)}
        {...props}
        />
      <label>{ label || placeholder || name }</label>
    </section>
  )
}
