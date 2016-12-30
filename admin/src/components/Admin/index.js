import React, { Component } from 'react'
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Icon } from 'react-fa';
import './index.scss';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, type) {
    let value = event.target.value;
    if (type === 'username') {
      this.setState({
        username: value
      });
    } else {
      this.setState({
        password: value
      });
    }
  }

  submit() {
    console.log(this.state.username);
    console.log(this.state.password);
    browserHistory.push('/admin');
  }

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
            <li>
              <Link to={``}>
                <Icon name="home" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={``}>
                <Icon name="home" />
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}


export default Login
