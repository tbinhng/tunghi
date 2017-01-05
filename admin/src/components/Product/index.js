import React, {Component} from 'react';
import {Table, Button, Pagination} from 'react-bootstrap';
import {Link} from 'react-router';
import productImg from '../../assets/products/product-img.jpg';
import './index.scss';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };

    this.handleSelect = this
      .handleSelect
      .bind(this);
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
              <td className="product-img"><Link to={``}><img role="presentation" src={productImg} /></Link></td>
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
              <td className="product-img"><Link to={``}><img role="presentation" src={productImg} /></Link></td>
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
              <td className="product-img"><Link to={``}><img role="presentation" src={productImg} /></Link></td>
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
