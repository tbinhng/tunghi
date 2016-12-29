import React, { Component } from 'react'
import './index.scss';
import './auth.scss';

class Login extends Component {
  render() {
    return (
      <main className="auth-main">
        <div className="auth-block">
          <h1>Sign in</h1>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>

              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>

              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default btn-auth">Sign in</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    )
  }
}


export default Login
