import React, {Component, PropTypes} from 'react';
import CustomTable from '../Common/Table';
import './index.scss';

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
      <CustomTable onSuccess={this.onSuccess} handleSelect={this.handleSelect} />
    );
  }
}

export default Product
