import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'
import InputPassword from '../Controls/InputPassword'
import InputEmail from '../Controls/InputEmail'

export const LoginForm = ({ user, location, history, signup = false }) => {
  let { newCollection } = user

  return (
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
        signup && <InputPassword
                    value={user.credentials.passwordConfirmation}
                    onChange={(value) => user.credentials.passwordConfirmation = value}
                    placeholder="password (confirmation)"
                    disabled={user.isValidating}
                  />
      }
      {
        signup && <Input
                    placeholder="Collection URL (link)"
                    value={newCollection.slug}
                    onChange={newCollection.setSlug}
                    disabled={newCollection.isValidating}
                    invalid={!newCollection.isAvailable}
                    valid={newCollection.isAvailable}
                    />
      }
      {
        signup && <Input
                    value={newCollection.source.apiKey}
                    onChange={(value) => newCollection.source.apiKey = value}
                    id="apiKey"
                    placeholder="Dropbox API Key"
                    disabled={user.isValidating}
                    autocapitalize="none"
                    required
                  />
      }

      <div className="error">{ user.error }</div>

      <pre>
        { JSON.stringify(user, null, 2)}
      </pre>
      <button
        onClick={() => user.login(history, signup)}
        disabled={user.isValidating}
        >
        { signup ? 'Sign Up' : 'Login' }
      </button>
    </div>
  )
}

export default inject('user')(observer(LoginForm))
