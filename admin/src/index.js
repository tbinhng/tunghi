import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login'
import { Router, Route, browserHistory } from 'react-router'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path='/login' component={Login} />
    </Route>
  </Router>,
  document.getElementById('root')
);
