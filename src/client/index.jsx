import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import store from './state'
import { history } from './state/routing'

// styles
import './styles/base.scss'

ReactDom.render(                                // bootstrap the app
  <Provider {...store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)
