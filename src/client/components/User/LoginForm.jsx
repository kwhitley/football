import React, { useState } from 'react'
import { useInject } from 'mobx-react-react'
import Page from '../Page'
import Input from '../Controls/Input'
import InputPassword from '../Controls/InputPassword'
import InputEmail from '../Controls/InputEmail'
import Inspect from '../Controls/Inspect'

const BetterInput = ({ base }) => {
  const { type, name } = base
  const [ model, setModel ] = useState(base)

  const handleInputChange = event => {
    const { name, value } = event.target

    setModel({ ...model, [name]: value })
  }

  return (
    <input
      name={name}
      value={model[name]}
      onChange={handleInputChange}
      />
  )
}

export default ({ navigate, signup = false }) => {
  const [ user, setUser ] = useState({
    email: '',
    password: '',
    isValidating: false,
    error: '',
  })

  const [ collection, setCollection ] = useState({
    slug: '',
    apiKey: '',
    isValidating: false,
    isValid: false,
  })

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  const model = {
    name: 'email', email: ''
  }

  return (
    <div className="form">
      <input
        name="email"
        value={user.email}
        onChange={handleInputChange}
        disabled={user.isValidating}
        />

      <input
        name="password"
        value={user.password}
        onChange={handleInputChange}
        disabled={user.isValidating}
        />

      <div className="error">{ user.error }</div>

      <button onClick={}>{ signup ? 'Sign Up' : 'Login' }</button>
    </div>
  )
}

// export default inject('user')(observer(LoginForm))
