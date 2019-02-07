import React from 'react'
import { observer, inject } from 'mobx-react'
import ToggleEditMode from './ToggleEditMode'
import LoginLogoutLink from './LoginLogoutLink'
import SignupLink from './SignupLink'
import CollectionsNav from './CollectionsNav'

export const UserActions = ({ user, location }) =>
  !false//['/login', '/signup'].includes(location.pathname)
  ? <div className="user-actions">
      { user.isLoggedIn && <CollectionsNav collections={user.collections} /> }
      <div className="login-signup">
        <LoginLogoutLink />
        <SignupLink />
      </div>
      <ToggleEditMode />
    </div>
  : null

export default inject('user')(observer(UserActions))
