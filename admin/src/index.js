import React from 'react'
import ReactDOM from 'react-dom'
import { 
  Router, 
  Route, 
  IndexRedirect,
  browserHistory } from 'react-router'
import {
  RouterStore,
  syncHistoryWithStore
} from 'mobx-react-router'
import { Provider } from 'mobx-react'
import App from './App'
import './index.scss'
import Login from './components/Login'

const RoutingStore = new RouterStore()
const stores = {
  routing: RoutingStore
}
const history = syncHistoryWithStore(browserHistory, RoutingStore)

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to='login' />
        <Route path='/login' component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
