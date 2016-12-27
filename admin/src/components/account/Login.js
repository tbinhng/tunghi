import React from 'react'
import { observer, inject } from 'mobx-react'
import Loading from '../common/Loading'
import Error from '../common/Error'

@inject('account') @observer
class Login extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ common }) {
    common.title = 'Login'
  }

  static contextTypes = {
    router: React.PropTypes.any
  }

  state = {
    username: '',
    password: '',
    loading: false,
    error: null
  }

  handleChange = (key) => (e) => {
    this.setState({
      [ key ]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { account } = this.props
    const { router } = this.context
    const { username, password } = this.state

    account.login({ username, password })
      .then(() => {
        this.setState({
          error: null,
          loading: true
        })
        setTimeout(() => router.transitionTo('/'), 500)
      })
      .catch(error => {
        this.setState({
          error,
          loading: false,
          password: ''
        })
      })
  }

  render() {
    const { loading, error } = this.state

    if (loading) {
      return <Loading />
    }

    return(
      <main className="auth-main">
        <div className="auth-block">
          <h1>Sign in to Blur Admin</h1>
          <form className="form-horizontal">
            <div className="form-group">
              <label for="inputEmail3" className="col-sm-2 control-label">Email</label>

              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
              </div>
            </div>
            <div className="form-group">
              <label for="inputPassword3" className="col-sm-2 control-label">Password</label>

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
    );
  }
}

export default Login
