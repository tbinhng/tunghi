import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router'
import { Icon } from 'react-fa'
import {PageHeader} from 'react-bootstrap';
import './index.scss'
import Loading from './../Common/Loading'

@inject('auth')
@observer class Admin extends Component {
  constructor(props) {
    super(props);
    this.auth = props.auth
  }

  componentDidMount() {
    this.auth.me()
  }

  render() {
    if (!this.auth.isLoggedIn) {
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
              <Link to={`/admin/dashboard`} activeClassName="active">
                <Icon name="home" />
                <span>Thống kê</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/product`} activeClassName="active">
                <Icon name="shopping-cart" />
                <span>Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/user`} activeClassName="active">
                <Icon name="users" />
                <span>Thành viên</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/email`} activeClassName="active">
                <Icon name="envelope" />
                <span>Hộp thư</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/comment`} activeClassName="active">
                <Icon name="comments" />
                <span>Bình luận</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/invoice`} activeClassName="active">
                <Icon name="shopping-bag" />
                <span>Hóa đơn</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/setting`} activeClassName="active">
                <Icon name="wrench" />
                <span>Thiết lập</span>
              </Link>
            </li>
          </ul>
        </aside>
        <div className="main-content">
          <PageHeader>{this.props.routes[this.props.routes.length-1].name}</PageHeader>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin
