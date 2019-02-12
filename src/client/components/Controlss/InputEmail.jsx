import React from 'react'
import Input from '../Controls/Input'

export default function InputEmail(props) {
  return (
    <Input
      className="email"
      placeholder="email address"
      pattern=".+@.{2,}\..{2,}"
      autoCapitalize="none"
      required
      {...props}
    />
  )
}

