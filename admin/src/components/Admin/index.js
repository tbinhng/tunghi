import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link, browserHistory } from 'react-router'
import { Icon } from 'react-fa'
import {PageHeader} from 'react-bootstrap';
import './index.scss'
import Loading from './../Common/Loading'

@inject('auth')
@observer class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageName: props.location.pathname.substring(1)
    }
    this.auth = props.auth
  }

  componentWillMount() {
    browserHistory.listen(location => {
      this.setState({
        pageName: location.pathname.substring(1)
      });
    });
  }

  componentDidMount() {
    this.auth.me()
  }

  render() {
    if (!this.auth.isLoading) {
      return <Loading />
    }

    return (
      <div className="menu">
        <div className="top-page">
          <Link to={`/client`} className="logo hover-green"><span className="color-green">TUNG HÍ</span> admin</Link>
          <div className="right-item">
            <Link to={`#`} className="left-item info-msg hover-green">
              <Icon name="bell-o"/>
              <span className="quantity">5</span>
              <ul></ul>
            </Link>
            <Link to={`/`} className="left-item hover-green">
              <Icon name="sign-out" size="2x"/>
            </Link>
          </div>
        </div>
        <aside className="sidebar">
          <ul>
            <li>
              <Link to={`/dashboard`} activeClassName="active">
                <Icon name="home" />
                <span>Thống kê</span>
              </Link>
            </li>
            <li>
              <Link to={`/product`} activeClassName="active">
                <Icon name="shopping-cart" />
                <span>Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to={`/user`} activeClassName="active">
                <Icon name="users" />
                <span>Thành viên</span>
              </Link>
            </li>
            <li>
              <Link to={`/email`} activeClassName="active">
                <Icon name="envelope" />
                <span>Hộp thư</span>
              </Link>
            </li>
            <li>
              <Link to={`/comment`} activeClassName="active">
                <Icon name="comments" />
                <span>Bình luận</span>
              </Link>
            </li>
            <li>
              <Link to={`/invoice`} activeClassName="active">
                <Icon name="shopping-bag" />
                <span>Hóa đơn</span>
              </Link>
            </li>
            <li>
              <Link to={`/setting`} activeClassName="active">
                <Icon name="wrench" />
                <span>Thiết lập</span>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="main-content">
          <PageHeader>{this.state.pageName}</PageHeader>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin
