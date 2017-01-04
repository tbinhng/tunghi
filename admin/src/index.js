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
import Product from './components/Product';
import User from './components/User';
import Setting from './components/Setting';
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
        <IndexRedirect to='dashboard' />
        <Route path='/login' component={Login} />
        <Route path='/admin' component={Admin} /*onEnter={authRequired}*/>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/product' component={Product} />
          <Route path='/user' component={User} />
          <Route path='/setting' component={Setting} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
