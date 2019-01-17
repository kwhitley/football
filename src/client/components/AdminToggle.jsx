import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

export const AdminToggle = ({ app, images }) =>
  images.items.length
  ? <div
      className={classNames('toggle', 'admin', app.adminMode && 'active')}
      onClick={app.toggleAdmin}
      >
      {
        app.adminMode ? 'editing' : 'locked'
      }
    </div>
  : null

export default inject('app', 'images')(observer(AdminToggle))

