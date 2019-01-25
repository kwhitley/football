import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import { RouterStore } from 'mobx-react-router'

export const routing = new RouterStore()
export const browserHistory = createHistory()
export const history = syncHistoryWithStore(browserHistory, routing)
