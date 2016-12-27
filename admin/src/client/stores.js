import requestCreator from 'core/helpers/request'
import Common from '../stores/common'
import Account from '../stores/account'

// All our actions are listed here
export const stores = (state = {}, token) => {
  const request = requestCreator(state.common.hostname, token)
  return {
    common: new Common(request, state.common),
    account: new Account(request, state.account)
  }
}

// Initialize actions and state
export default process.env.BROWSER ? stores(window.__STATE) : {}
