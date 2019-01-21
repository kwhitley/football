import React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'

export const UserActionLink = ({ user }) =>
  <div className="userlink">
    {
      user.isLoggedIn && user.profile
      ? <a className="link" onClick={user.logout}>Logout ({ user.profile.email })</a>
      : <NavLink to="/login">Login</NavLink>
    }
  </div>

export default inject('user')(observer(UserActionLink))
