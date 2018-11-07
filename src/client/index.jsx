// global imports
import React from 'react'
import ReactDom from 'react-dom'
import 'semantic-ui-css/semantic.min.css'       // load base styles

// local imports
import App from './components/App'              // root React component

// styles
import './styles/base.scss'                     // example local SASS/LESS

ReactDom.render(                                // bootstrap the app
  <App />,
  document.getElementById('app')
)
