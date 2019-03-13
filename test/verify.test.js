'use strict'

const { describe, it } = require('mocha')
const { expect } = require('chai')
const verify = require('../src/verify')

describe('Verify', () => {
  it('Return SemanticReleaseError if SURGE_TOKEN environment variable is not defined', async () => {
    try {
      await verify({}, {})
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('ENOSURGETOKEN')
    }
  })

  it('Return SemanticReleaseError if "alias" option is not a String', async () => {
    try {
      process.env.SURGE_TOKEN = 'my-token'
      await verify({}, {})
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EINVALIDALIAS')
    }
  })

  it('Verify alias from SURGE_TOKEN environmen variable', async () => {
    process.env.SURGE_ALIAS = 'my-awesome-app.surge.sh'
    expect(await verify({}, {})).to.be.a('undefined')
    process.env.SURGE_ALIAS = undefined
  })

  it('Verify "alias" options', async () => {
    expect(await verify({ alias: 'my-awesome-app.surge.sh' }, {})).to.be.a(
      'undefined'
    )
  })

  it('Verify alias from SURGE_ALIAS environmen variable', async () => {
    process.env.SURGE_ALIAS = 'my-awesome-app.surge.sh'
    expect(await verify({}, {})).to.be.a('undefined')
  })
})
