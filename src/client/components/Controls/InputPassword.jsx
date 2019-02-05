import React from 'react'
import Input from '../Controls/Input'

export default function InputPassword(props) {
  return (
    <Input
      placeholder="password"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      type="password"
      autoCapitalize="none"
      required
      {...props}
    />
  )
}

