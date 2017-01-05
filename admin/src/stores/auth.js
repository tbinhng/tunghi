import { observable, computed, action, runInAction } from 'mobx'
import Singleton from 'singleton'
// import { normalize } from 'normalizr'
import authService from './../services/auth'
// import User from './../models/User'
import Store from 'store'
import { ACCESS_TOKEN_PATH } from './../config'

export class Auth extends Singleton {
  @observable user = null
  @observable error = null
  @observable loading = false

  service = null

  constructor() {
    super()

    this.service = authService
  }

  @computed get isLoggedIn() {
    return !!Store.get(ACCESS_TOKEN_PATH)
  }

  @computed get isAuthenticated() {
    return !!this.user
  }

  @computed get hasError() {
    return !!this.error
  }

  @computed get isLoading() {
    return !!this.loading
  }

  @computed get fullName() {
    return `${this.user.lname} ${this.user.mname} ${this.user.fname}`
  }

  @action
  async login(credentials) {
    this.loading = true

    try {
      await this.service.fetchToken(credentials)
      this.handleSuccessRequest()
    } catch (error) {
      this.handleFailureRequest(error)
    }
  }

  @action
  async me() {
    this.loading = true

    try {
      this.user = await this.service.fetchAuthedUser()
      this.handleSuccessRequest()
    } catch (error) {
      this.handleFailureRequest(error)
    }
  }

  @action
  handleSuccessRequest() {
    runInAction('handleSuccessRequest', () => {
      this.error = null
      this.loading = false
    })
  }

  @action
  handleFailureRequest(error) {
    runInAction('handleFailureRequest', () => {
      this.error = error
      this.loading = false
    })
  }

  @action
  async logout() {
    await this.service.logout()
  }

}

export default Auth.get()