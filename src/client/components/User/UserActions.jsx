import React from 'react'
import { observer } from 'mobx-react'
import ToggleEditMode from './ToggleEditMode'
import UserActionLink from './UserActionLink'

export const UserActions = ({ location }) =>
  location.pathname !== '/login'
  ? <div className="user-actions">
      <ToggleEditMode />
      <UserActionLink />
    </div>
  : null

export default observer(UserActions)
