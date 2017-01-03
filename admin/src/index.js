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
import App from './components/App'
import './bootstrap/_bootstrap.scss';
import './index.scss'
import Login from './components/Login'
import Admin from './components/Admin'
import Dashboard from './components/Dashboard'
import Auth from './stores/auth'

const RoutingStore = new RouterStore()
const stores = {
  auth: Auth,
  routing: RoutingStore
}
const history = syncHistoryWithStore(browserHistory, RoutingStore)

// const authRequired = (nextState, replace) => {
//   if (!Auth.isLoggedIn) {
//     replace('/login');
//   }
// }

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to='admin' />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} /*onEnter={authRequired}*/>
          <Route path='/dashboard' component={Dashboard} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
