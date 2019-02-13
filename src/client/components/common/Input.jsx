import React, { useRef } from 'react'
import classNames from 'classnames'
import { useFocus } from 'hooks'

const valueOnly = (fn) => ({ target }) => {
  let { name, value } = target

  if (name) {
    return fn(target)
  } else {
    return fn(value)
  }
}

export default function Input({
  name,
  value,
  onChange,
  label,
  placeholder,
  className,
  validator,
  ...props
}) {
  let ref = useRef(null)
  useFocus(ref)
  let invalid = undefined
  let validationMessage = undefined

  if (validator) {
    invalid = validator.isValid(value) ? undefined : 'true'
    validationMessage = invalid && value && validator.message
  }

  return (
    <section className="input-group">
      <input
        ref={ref}
        className={classNames('input', className)}
        type="text"
        name={name}
        value={value}
        invalid={invalid}
        placeholder={placeholder || name}
        onChange={valueOnly(onChange)}
        {...props}
        />
      <label className={validationMessage ? 'hint' : undefined}>{ label || placeholder || name }</label>
      {
        validator && validator.message &&
        <b className={classNames('details', validationMessage && 'visible')}>
          { validationMessage }
        </b>
      }
    </section>
  )
}
