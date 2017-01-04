import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import productImg from '../../assets/products/product-img.jpg';
import './index.scss';

class Product extends Component {

  render() {
    return (
      <div className="product-list">
        <Button bsStyle="primary" className="add-btn">Thêm sản phẩm</Button>
        <Table striped bordered condensed hover>
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
              <td className="product-img"><Link to={``}><img src={productImg} /></Link></td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>2,000,000</td>
              <td>20</td>
              <td><Button bsStyle="warning">Edit</Button><Button bsStyle="danger">Delete</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td className="product-img"><Link to={``}><img src={productImg} /></Link></td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>2,000,000</td>
              <td>20</td>
              <td><Button bsStyle="warning">Edit</Button><Button bsStyle="danger">Delete</Button></td>
            </tr>
            <tr>
              <td>3</td>
              <td className="product-img"><Link to={``}><img src={productImg} /></Link></td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>2,000,000</td>
              <td>20</td>
              <td><Button bsStyle="warning">Edit</Button><Button bsStyle="danger">Delete</Button></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Product
