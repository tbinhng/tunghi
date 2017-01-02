import crypto from 'crypto'
import config from './../config'

export const isEmail = (value) => {
  return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
}

export const getProjection = (fieldASTs) => {
  return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = 1;
    return projections;
  }, {});
}

/**
 * Hash the password
 * @private
 * @param str
 * @returns {string}
 */
export const sha512 = (str) => {
  return crypto.createHmac('sha512', config.session.salt).update(str).digest('hex')
}