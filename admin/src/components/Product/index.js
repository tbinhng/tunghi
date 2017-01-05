import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react'
import {
  Table, 
  Button, 
  Pagination,
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import BaseForm from './../Common/BaseForm';
import productImg from '../../assets/products/product-img.jpg';
import './index.scss';

@observer class Product extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.form = new BaseForm({
      search: {
        name: 'search',
        label: 'Tìm kiếm theo tên sản phẩm, loại sản phẩm,...',
        default: ''
      }
    });

    this.onSuccess = this.onSuccess.bind(this);
    this.handleSelect = this
      .handleSelect
      .bind(this);
  }

  onSuccess(form) {
    console.log(form.values());
  }

  handleSelect(event) {
    this.setState({activePage: event});
  }

  render() {
    return (
      <div className="product-list">
        <div className="table-utils">
          <Button bsStyle="primary" className="add-btn left-item hover-scale">Thêm sản phẩm</Button>
          <Pagination
            className="right-item"
            first
            last
            items={10}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}/>
          <Form
          className="left-item"
          autoComplete="off"
          onSubmit={e => this
          .form
          .onSubmit(e, {onSuccess: this.onSuccess})}>
            <FormGroup 
            controlId="search">
              <Col md={12}>
                <FormControl
                  name={this.form.$('search').name}
                  value={this.form.$('search').value}
                  type="text"
                  placeholder={this.form.$('search').label}
                  onChange={this.form.$('search').sync} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type='submit'
                  bsStyle="primary"
                  className="search-btn"
                  onClick={this.submit}>
                  <Icon name="search" />
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>

        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Phân loại</th>
              <th>Giá tiền</th>
              <th>Số lượng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="product-img">
                <Link to={``}><img role="presentation" src={productImg}/></Link>
              </td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>2,000,000</td>
              <td>20</td>
              <td className="action">
                <Button bsStyle="warning" className="edit-btn hover-scale">Edit</Button>
                <Button bsStyle="danger" className="hover-scale">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="product-img">
                <Link to={``}><img role="presentation" src={productImg}/></Link>
              </td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>2,000,000</td>
              <td>20</td>
              <td className="action">
                <Button bsStyle="warning" className="edit-btn hover-scale">Edit</Button>
                <Button bsStyle="danger" className="hover-scale">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td className="product-img">
                <Link to={``}><img role="presentation" src={productImg}/></Link>
              </td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>2,000,000</td>
              <td>20</td>
              <td className="action">
                <Button bsStyle="warning" className="edit-btn hover-scale">Edit</Button>
                <Button bsStyle="danger" className="hover-scale">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Product
