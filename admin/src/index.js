import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  Route,
  IndexRedirect,
  // IndexRoute,
  Redirect,
  browserHistory } from 'react-router'
import {
  RouterStore,
  syncHistoryWithStore
} from 'mobx-react-router'
import { Provider } from 'mobx-react'
import App from './components/App'
import './bootstrap/_bootstrap.scss'
import './index.scss'
import Login from './components/Login'
import Admin from './components/Admin'
import Dashboard from './components/Dashboard'
import Product from './components/Product'
import User from './components/User'
import Comment from './components/Comment'
import Email from './components/Email'
import Invoice from './components/Invoice'
import Setting from './components/Setting'
import Auth from './stores/auth'

const RoutingStore = new RouterStore()
const stores = {
  auth: Auth,
  routing: RoutingStore
}
const history = syncHistoryWithStore(browserHistory, RoutingStore)

const authRequired = (nextState, replace) => {
  if (!Auth.isLoggedIn) {
    replace('/admin/login')
  }
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <Redirect from='/' to='admin' />
      <Route path="admin" component={App}>
        <IndexRedirect to='dashboard' />
        <Route path='login' component={Login} />
        <Route component={Admin} onEnter={authRequired}>
          <Route name='Dashboard' path='dashboard' component={Dashboard} />
          <Route name='Products' path='product' component={Product} />
          <Route name='Comments' path='comment' component={Comment} />
          <Route name='Emails' path='email' component={Email} />
          <Route name='Invoices' path='invoice' component={Invoice} />
          <Route name='Users' path='user' component={User} />
          <Route name='Settings' path='setting' component={Setting} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
