'use strict'

const getError = require('./get-error')

module.exports = async ({ alias = '' }) => {
  if (!process.env.SURGE_TOKEN) {
    throw getError('ENOSURGETOKEN')
  }

  if (!process.env.SURGE_ALIAS && alias === '') {
    throw getError('EINVALIDALIAS', { alias: process.env.SURGE_ALIAS || alias })
  }
}
