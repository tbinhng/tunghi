import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router';
import {Icon} from 'react-fa';
import './index.scss';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageName: props.location.pathname.substring(1)
    }
  }

  componentWillMount() {
    
    browserHistory.listen(location => {
      this.setState({
        pageName: location.pathname.substring(1)
      });
    });
  }

  render() {
    return (
      <div className="menu">
        <div className="top-page">
          <Link to={`/client`} className="logo">TUNG HÍ admin</Link>
          <div className="right-item">
            <Link to={`#`} className="left-item info-msg">
              <Icon name="bell-o"/>
              <span className="quantity">5</span>
              <ul></ul>
            </Link>
            <Link to={`/`} className="left-item">
              <Icon name="sign-out" size="2x"/>
            </Link>
          </div>
        </div>
        <aside className="sidebar">
          <ul>
            <li>
              <Link to={`/dashboard`} activeClassName="active">
                <Icon name="home" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/product`} activeClassName="active">
                <Icon name="shopping-cart" />
                <span>Product</span>
              </Link>
            </li>
            <li>
              <Link to={`/user`} activeClassName="active">
                <Icon name="user" />
                <span>User</span>
              </Link>
            </li>
            <li>
              <Link to={`/setting`} activeClassName="active">
                <Icon name="wrench" />
                <span>Setting</span>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="main-content">
          <h1 className="left-item">{this.state.pageName}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Admin
