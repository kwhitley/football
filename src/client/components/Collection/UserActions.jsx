import React from 'react'
import { observer } from 'mobx-react'
import ToggleEditMode from './ToggleEditMode'
import LoginLogoutLink from './LoginLogoutLink'
import SignupLink from './SignupLink'

export const UserActions = ({ location }) =>
  !['/login', '/signup'].includes(location.pathname)
  ? <div className="user-actions">
      <div className="login-signup">
        <LoginLogoutLink />
        <SignupLink />
      </div>
      <ToggleEditMode />
    </div>
  : null

export default observer(UserActions)
