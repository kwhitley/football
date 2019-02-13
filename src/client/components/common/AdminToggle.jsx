import React from 'react'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'

const AdminToggle = ({ app, visible }) =>
  visible
  ? <div
      className={classNames('toggle', 'edit', app.editMode && 'active')}
      onClick={app.toggleEdit}
      >
      {
        app.editMode ? 'editing' : 'locked'
      }
    </div>
  : null

export default inject('app')(observer(AdminToggle))

