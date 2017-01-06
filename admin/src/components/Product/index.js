import React, {Component, PropTypes} from 'react';
import CustomTable from '../Common/Table';
import './index.scss';

const headers = ['#', 'Hình ảnh', 'Tên sản phẩm', 'Phân loại','Giá tiền','Số lượng'];
const data = [{
  id: 1,
  img: 'http://i.imgur.com/u5OUfBF.jpg',
  name: 'giỏ xách',
  category: 'gucci',
  price: 2000000,
  quantity: 20
},
{
  id: 2,
  img: 'http://i.imgur.com/u5OUfBF.jpg',
  name: 'túi xách',
  category: 'việt nam',
  price: 200000,
  quantity: 2
},
{
  id: 3,
  img: 'http://i.imgur.com/u5OUfBF.jpg',
  name: 'túi vải',
  category: 'thái lan',
  price: 500000,
  quantity: 20
}];

class Product extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
    this.handleSelect = this
      .handleSelect
      .bind(this);
  }

  onSuccess(form) {
    console.log(`product ${form.values()}`);
  }

  handleSelect(event) {
    console.log('handleSelect product')
  }

  render() {
    return (
      <CustomTable headers={headers} data={data} onSuccess={this.onSuccess} handleSelect={this.handleSelect} />
    );
  }
}

export default Product
