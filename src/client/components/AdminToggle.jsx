import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

export const AdminToggle = ({ app }) =>
  <div
    className={classNames('toggle', 'admin', app.adminMode && 'active')}
    onClick={app.toggleAdmin}
    >
    {
      app.adminMode ? 'editing' : 'locked'
    }
  </div>

export default inject('app')(observer(AdminToggle))

