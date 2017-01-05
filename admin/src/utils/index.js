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

/**
 * Encode object to url parameters
 *
 * @param      {Object} paramsObj The object needs to encode as url parameters
 * @return     {String} Encoded url parameters
 */
export const objToParams = paramsObj => {
  let str = '';
  for (const key in paramsObj) {
    if (str !== '') {
      str += '&';
    }
    str += `${key}=${encodeURIComponent(paramsObj[key])}`;
  }
  return str;
};