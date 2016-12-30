import React, { Component } from 'react'
import {Modal, Button, Col, FormGroup, Form} from 'react-bootstrap';
import {browserHistory} from 'react-router';
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
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h1>Login Tunghi Admin</h1>
            <Form horizontal>
              <FormGroup controlId="email">
                <Col md={2}><label>Email</label></Col>
                <Col md={10}><input className="login-input" type="text" placeholder="Username" onChange={(event) => this.handleChange(event, 'username')} /></Col>
              </FormGroup>

              <FormGroup controlId="password">
                <Col md={2}><label>Password</label></Col>
                <Col md={10}><input className="login-input" type="password" placeholder="Password" onChange={(event) => this.handleChange(event, 'password')} /></Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsStyle="primary" onClick={this.submit}>Login</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}


export default Login
