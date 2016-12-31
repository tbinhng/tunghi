import { getHeaders, handleException } from './../utils'
import { request } from './../utils/api'
import Store from 'store'
import Singleton from 'singleton'
import {
  WS_LOGIN_URL,
  WS_LOGOUT_URL,
  WS_AUTHED_USER_URL,
  ACCESS_TOKEN_PATH
} from './../config'

class AuthService extends Singleton {

  fetchToken(credentials) {
    try {
      let options = getHeaders('', 'POST', credentials)
      return request(WS_LOGIN_URL, options).then(this.validateToken)
    } catch (error) {
      handleException(error)
    }
  }

  fetchAuthedUser(token = '') {
    try {
      if (!token) {
        token = Store.get(ACCESS_TOKEN_PATH)
      }
      let options = getHeaders(token)

      return request(WS_AUTHED_USER_URL, options).then(json => json.user)
    } catch (error) {
      handleException(error)
    }
  }

  logout() {
    Store.remove(ACCESS_TOKEN_PATH)
    return request(WS_LOGOUT_URL)
  }

  validateToken(json) {
    if (json.error) {
      throw new Error(json.error)
    }

    Store.set(ACCESS_TOKEN_PATH, json.token)
    return json.token
  }

}

export default AuthService.get()