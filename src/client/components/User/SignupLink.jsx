import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from '@reach/router'

export const SignupLink = ({ user }) =>
  !user.isLoggedIn
  ? <Link className="signup" to="/signup">Sign Up</Link>
  : null

export default inject('user')(observer(SignupLink))
