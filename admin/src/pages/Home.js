import React from 'react'
import { observer, inject } from 'mobx-react'

@observer
class Home extends React.Component {

  // When route is loaded (isomorphic)
  static onEnter({ common, params }) {
    common.title = 'Home'
  }

  render() {
    return <main>
      <h1>Home Page</h1>
    </main>
  }
}

export default Home
