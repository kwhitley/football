import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'
import InputPassword from '../Controls/InputPassword'
import InputEmail from '../Controls/InputEmail'

export const LoginForm = ({ user, location, history, signup = false }) =>
  <div className="form full-page user-login">
    <InputEmail
      value={user.credentials.email}
      onChange={(value) => user.credentials.email = value}
      disabled={user.isValidating}
      />
    <InputPassword
      value={user.credentials.password}
      onChange={(value) => user.credentials.password = value}
      disabled={user.isValidating}
    />

    {
      signup
      ? <InputPassword
          value={user.credentials.passwordConfirmation}
          onChange={(value) => user.credentials.passwordConfirmation = value}
          placeholder="password (confirmation)"
          disabled={user.isValidating}
        />
      : null
    }
    {
      signup
      ? <Input
          value={user.credentials.apiKey}
          onChange={(value) => user.credentials.apiKey = value}
          id="apiKey"
          placeholder="Dropbox API Key"
          disabled={user.isValidating}
          autocapitalize="none"
          required
          />
      : null
    }

    <div className="error">{ user.error }</div>

    <button
      onClick={() => user.login(history, signup)}
      disabled={user.isValidating}
      >
      { signup ? 'Sign Up' : 'Login' }
    </button>
  </div>

export default inject('user')(observer(LoginForm))
