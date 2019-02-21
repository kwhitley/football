import React, { useRef, memo } from 'react'
import classNames from 'classnames'
import { useFocus, useStore } from 'hooks'

const valueOnly = (fn) => (e) => {
  // console.log('e', e)
  let { target } = e
  // console.log('target', target)
  let { name, value } = target
  // console.log('name:value', name, value)

  if (name) {
    return fn(target)
  } else {
    return fn(value)
  }
}

export default memo(function Input({
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
  let [ foo ] = useStore('foo')
  useFocus(ref)
  let invalid = undefined
  let validationMessage = undefined

  if (validator) {
    invalid = validator.isValid(value) ? undefined : 'true'
    validationMessage = invalid && value && validator.message
  }

  console.log('Input, value', value)

  return (
    <section className="input-group">
      useStore('foo')={foo}
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
})
