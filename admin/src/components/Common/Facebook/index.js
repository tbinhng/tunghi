// @flow
import React, { Component, PropTypes } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { Icon } from 'react-fa'
import { objToParams } from './../../../utils'
import './Facebook.scss'

class FacebookLogin extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    reAuthenticate: PropTypes.bool,
    scope: PropTypes.string,
    redirectUri: PropTypes.string,
    textButton: PropTypes.string,
    typeButton: PropTypes.string,
    autoLoad: PropTypes.bool,
    disableMobileRedirect: PropTypes.bool,
    size: PropTypes.string,
    fields: PropTypes.string,
    cssClass: PropTypes.string,
    version: PropTypes.string,
    icon: PropTypes.any,
    language: PropTypes.string,
    onClick: PropTypes.func,
    containerStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
  }

  static defaultProps = {
    textButton: 'Login with Facebook',
    typeButton: 'button',
    redirectUri: window.location.href,
    scope: 'public_profile,email',
    xfbml: false,
    cookie: false,
    reAuthenticate: false,
    size: 'metro',
    fields: 'name',
    cssClass: 'kep-login-facebook',
    version: '2.3',
    language: 'en_US',
    disableMobileRedirect: false,
  }

  state = {
    isSdkLoaded: false,
    isProcessing: false,
  }

  componentWillMount() {
    if (document.getElementById('facebook-jssdk')) {
      this.setState({ isSdkLoaded: true })
      return
    }

    this.setFbAsyncInit()
    this.loadSdkAsynchronously()
  }

  componentDidMount() {
    let fbRoot = document.getElementById('fb-root')
    if (!fbRoot) {
      fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.appendChild(fbRoot)
    }
  }

  setFbAsyncInit = () => {
    const { appId, xfbml, cookie, version, autoLoad } = this.props
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        cookie,
      })
      this.setState({ isSdkLoaded: true })
      if (autoLoad || window.location.search.includes('facebookdirect')) {
        window.FB.getLoginStatus(this.checkLoginAfterRefresh)
      }
    }
  }

  loadSdkAsynchronously = () => {
    const { language } = this.props;
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[ 0 ]
      const fjs = element
      let js = element
      if (d.getElementById(id)) { return }
      js = d.createElement(s) 
      js.id = id
      js.src = `//connect.facebook.net/${language}/all.js`
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }

  responseApi = (authResponse) => {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      Object.assign(me, authResponse)
      this.props.callback(me)
    })
  }

  checkLoginState = (response) => {
    this.setState({ isProcessing: false })
    if (response.authResponse) {
      this.responseApi(response.authResponse)
    } else {
      if (this.props.callback) {
        this.props.callback({ status: response.status })
      }
    }
  }

  checkLoginAfterRefresh = (response) => {
    if (response.status === 'unknown') {
      window.FB.login(loginResponse => this.checkLoginState(loginResponse), true)
    } else {
      this.checkLoginState(response)
    }
  }

  click = () => {
    if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.isDisabled) {
      return
    }
    this.setState({ isProcessing: true })
    const { scope, appId, onClick, reAuthenticate, redirectUri, disableMobileRedirect } = this.props

    if (typeof onClick === 'function') {
      onClick()
    }

    let isMobile = false

    try {
      isMobile = ((window.navigator && window.navigator.standalone) || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i))
    } catch (ex) {
      // continue regardless of error
    }

    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state: 'facebookdirect',
      scope,
    }

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate'
    }

    if (isMobile && !disableMobileRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth?${objToParams(params)}`
    } else {
      window.FB.login(this.checkLoginState, { scope, auth_type: params.auth_type })
    }
  }

  render() {
    const { typeButton, textButton } = this.props
    return (
      <Button type={typeButton} className="fb-login" onClick={this.click}>
        <Icon name="facebook-official" size="2x" />
        <span>{textButton}</span>
      </Button>
    )
  }
}

export default FacebookLogin