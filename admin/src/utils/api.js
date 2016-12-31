import store from 'store'
import {
  ACCESS_TOKEN_PATH
} from './../config'

export const parseJSON = (response) => {
  return response.json()
}

export const checkHttpStatus = (response) => {
  if (response.status >= 200) {
    if (response.status === 401) {
      store.remove(ACCESS_TOKEN_PATH)
      return window.location.href = '/login'
    }

    return parseJSON(response)
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const request = (url, options) => {
  if (!Object.keys(options).length) {
    throw new Error('Missing options stack')
  }

  return fetch(url, options)
    .then(checkHttpStatus)
    .catch(function(error) {
      console.log('request failed', error)
    })
}