import React from 'react'
import { observer, inject } from 'mobx-react'
import Loading from '../common/Loading'

@inject('account') @observer
class Logout extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ common }) {
    common.title = 'Logout'
  }

  static contextTypes = {
    router: React.PropTypes.any
  }

  state = {
    loading: false
  }

  handleLogout = () => {
    const { account } = this.props
    const { router } = this.context

    account.logout().then(() => {
      this.setState({
        loading: true
      })
      setTimeout(() => router.transitionTo('/'), 500)
    })
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return <Loading />
    }

    return <main>
      <center className="account">
        <h3>Do you want to log out ?</h3>
        <p>This will disconnect you and you will have to login again next time.</p>

        <button onClick={this.handleLogout}>Logout</button>
      </center>
    </main>
  }
}

export default Logout
