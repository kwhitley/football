import React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'

export const SignupLink = ({ user }) =>
  !user.isLoggedIn
  ? <NavLink className="signup" to="/signup">Sign Up</NavLink>
  : null

export default inject('user')(observer(SignupLink))
