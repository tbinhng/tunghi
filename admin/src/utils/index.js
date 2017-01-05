export const getHeaders = (accessToken, method = 'GET', body = {}, headers = {}) => {
  let options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (Object.keys(headers).length) {
    options = Object.assign({}, options, { headers })
  }

  if (accessToken) {
    options.headers['x-access-token'] = accessToken
  }

  if (Object.keys(body).length) {
    options.body = JSON.stringify(body)
  }

  return options
}

export const handleException = (error) => {
  const message = error.message || 'Oops! Something went wrong'
  throw new Error(message)
}