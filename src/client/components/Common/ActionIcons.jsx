import React from 'react'
import classNames from 'classnames'

export function ActionIcon({ className, disabled, children, onClick, }) {
  return (
    <span
      className={classNames('action', className, disabled && 'disabled')}
      onClick={!disabled ? onClick : () => {}}
      >
      { children }
    </span>
  )
}

export function ActionIconToggle({ className, state, states, children, onClick }) {
  return (
    <ActionIcon className={classNames('action-toggle', className)} onClick={onClick}>
      { states[state] }
      { children }
    </ActionIcon>
  )
}
