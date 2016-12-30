import React, { Component } from 'react'
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import './index.scss';

class Admin extends Component {

  render() {
    return (
      <div className="menu">
        <div className="top-page">
          <Link to={`/client`} className="logo">TUNG HÍ Shop</Link>
          <div className="right-item">
            <Link to={`#`} className="left-item info-msg">
              <Icon name="bell-o" />
              <span className="quantity">5</span>
              <ul>

              </ul>
            </Link>
            <Link to={`/`} className="left-item">
              <Icon name="sign-out" size="2x" />
            </Link>
          </div>
        </div>
        <aside className="sidebar">
          <ul>
            <li className="active">
              <Link to={`/dashboard`}>
                <Icon name="home" size="3x" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" size="3x" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" size="3x" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" size="3x" />
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </aside>
        {this.props.children}
      </div>
    );
  }
}


export default Admin
