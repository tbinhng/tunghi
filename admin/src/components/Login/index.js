import './index.scss'
import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Modal,
  Button,
  Col,
  FormGroup,
  FormControl,
  Form,
  HelpBlock
} from 'react-bootstrap'
import BaseForm from './../Common/BaseForm'
import Loading from './../Common/Loading'
import Facebook from './../Common/Facebook'

@inject('auth')
@observer class Login extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.onSuccess = this.onSuccess.bind(this)
    this.form = new BaseForm({
      id: {
        name: 'id',
        label: 'Username or Email',
        default: '',
        rules: 'required|string',
      },
      password: {
        name: 'password',
        label: 'Password',
        default: '',
        rules: 'required|string|between:5,25',
      }
    })
    this.auth = props.auth
  }

  onSuccess(form) {
    this.auth.login(form.values()).then(() => {
      this.context.router.replace('/admin')
    })
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  componentClicked = (response) => {
    console.log(response);
  }

  render() {
    if (this.auth.loading) {
      return <Loading />
    }

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Body>
            <h1>Login Tunghi Admin</h1>
            <div className="fb-login">
              <Facebook
                appId="1426953154015836"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            </div>
            <Form
              horizontal
              autoComplete="off"
              onSubmit={e => this.form.onSubmit(e, { onSuccess: this.onSuccess })}>
              <FormGroup controlId="id" validationState={this.form.$('id').hasError ? 'error' : 'success'}>
                <Col md={12}>
                  <FormControl
                    name={this.form.$('id').name}
                    value={this.form.$('id').value}
                    className="login-input"
                    type="text"
                    placeholder={this.form.$('id').label}
                    autoComplete="off"
                    onChange={this.form.$('id').sync} />
                  <FormControl.Feedback />
                  <HelpBlock>{this.form.$('id').error || ''}</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup controlId="password" validationState={this.form.$('password').hasError ? 'error' : 'success'}>
                <Col md={12}>
                  <FormControl
                    name={this.form.$('password').name}
                    value={this.form.$('password').value}
                    className="login-input"
                    type="password"
                    placeholder={this.form.$('password').label}
                    onChange={this.form.$('password').sync} />
                  <FormControl.Feedback />
                  <HelpBlock>{this.form.$('password').error || ''}</HelpBlock>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button
                    type='submit'
                    bsStyle="primary"
                    disabled={!(this.form.$('id').isDirty && this.form.$('password').isDirty && this.form.$('id').isValid && this.form.$('password').isValid)}
                    onClick={this.submit}>
                    Login
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    )
  }
}

export default Login
