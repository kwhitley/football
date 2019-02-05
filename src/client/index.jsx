import React, { h } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'

import App from './components/App'
import store from './state'
import { history } from './state/routing'
// import './utils/zoomfix'

// styles
import './styles/base.scss'

ReactDom
  .createRoot(document.getElementById('app'))
  .render(
    <Provider {...store}>
      <App history={history} />
    </Provider>
  )
