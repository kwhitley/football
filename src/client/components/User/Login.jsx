import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'

export const LoginForm = ({ user, location, history }) =>
  <div className="form full-page user-login">
    <Input
      value={user.credentials.email}
      onChange={(value) => user.credentials.email = value}
      placeholder="email address"
      disabled={user.isValidating}
      required
      />
    <Input
      value={user.credentials.password}
      onChange={(value) => user.credentials.password = value}
      placeholder="password"
      type="password"
      disabled={user.isValidating}
      required
      />

    <div className="error">{ user.error }</div>

    <button
      onClick={() => user.login(history)}
      disabled={user.isValidating}
      >
      Submit
    </button>
  </div>

export default inject('user')(observer(LoginForm))
