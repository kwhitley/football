import React, { h } from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import store from './state'
import { history } from './state/routing'
// import './utils/zoomfix'

// styles
import './styles/base.scss'

render(
  <Provider {...store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)
