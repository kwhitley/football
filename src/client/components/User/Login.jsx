import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'

export const LoginForm = ({ user, location, history, signup = false }) =>
  <div className="form full-page user-login">
    <Input
      value={user.credentials.email}
      onChange={(value) => user.credentials.email = value}
      className="email"
      placeholder="email address"
      pattern=".+@.{2,}\..{2,}"
      disabled={user.isValidating}
      autocapitalize="none"
      required
      />
    <Input
      value={user.credentials.password}
      onChange={(value) => user.credentials.password = value}
      placeholder="password"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      type="password"
      disabled={user.isValidating}
      autocapitalize="none"
      required
      />

    {
      signup
      ? <Input
          value={user.credentials.passwordConfirmation}
          onChange={(value) => user.credentials.passwordConfirmation = value}
          placeholder="password (confirmation)"
          type="password"
          disabled={user.isValidating}
          autocapitalize="none"
          required
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
