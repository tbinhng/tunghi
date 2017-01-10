import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react'
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
import BaseForm from '../BaseForm';
import './index.scss';

@observer class CustomTable extends Component {

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

    if (props.onSuccess) {
      this.onSuccess = function (form) {
        props.onSuccess(form);
      };
    }
    if (props.handleSelect) {
      this.handleSelect = function (event) {
        this.setState({activePage: event});
        props.handleSelect();
      };
    }
    if (props.addItem) {
      this.addItem = props.addItem;
    }

    this.onSuccess = this
      .onSuccess
      .bind(this);
    this.handleSelect = this
      .handleSelect
      .bind(this);
    this.addItem = this
      .addItem
      .bind(this);
  }

  addItem(event) {
    console.log(event);
  }

  onSuccess(form) {
    console.log(`customtable ${form.values()}`);
  }

  handleSelect(event) {
    this.setState({activePage: event});
  }

  render() {

    return (
      <div className="table-list">
        <div className="table-utils">
          <Button
            onClick={this.addItem}
            bsStyle="primary"
            className="add-btn left-item hover-scale">Thêm sản phẩm</Button>
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
            <FormGroup controlId="search">
              <Col md={12}>
                <FormControl
                  name={this
                  .form
                  .$('search')
                  .name}
                  value={this
                  .form
                  .$('search')
                  .value}
                  type="text"
                  placeholder={this
                  .form
                  .$('search')
                  .label}
                  onChange={this
                  .form
                  .$('search')
                  .sync}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type='submit'
                  bsStyle="primary"
                  className="search-btn"
                  onClick={this.submit}>
                  <Icon name="search"/>
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>

        <Table bordered condensed hover>
          <thead>
            <tr>
              {this
                .props
                .headers
                .map((header, index) => {
                  return <th key={index}>{header}</th>
                })}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this
              .props
              .data
              .map((row, index) => {
                return (
                  <tr key={index}>
                    {Object
                      .keys(row)
                      .map((key, j) => {
                        if (key === 'img') {
                          return (
                            <td className="product-img" key={j}>
                              <Link to={``}><img role="presentation" src={row[key]}/></Link>
                            </td>
                          );
                        }
                        return <td key={j}>{row[key]}</td>;
                      })}
                    <td className="action">
                      <Button bsStyle="warning" className="edit-btn hover-scale">Edit</Button>
                      <Button bsStyle="danger" className="hover-scale">Delete</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CustomTable
