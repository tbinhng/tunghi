import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router'

@inject('account') @observer
class Menu extends React.Component {
  render() {
    const { account } = this.props
    return <div>
      <menu>
        <Link activeClassName="selected" to="/">Home</Link>
      </menu>
    </div>
  }
}

export default Menu
