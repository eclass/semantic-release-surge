'use strict'

const path = require('path')
const tempy = require('tempy')
const { stub } = require('sinon')
const { describe, it, before, beforeEach } = require('mocha')
const { outputJson } = require('fs-extra')
const { expect } = require('chai')
const { WritableStreamBuffer } = require('stream-buffers')
const prepare = require('../src/prepare')

describe('Prepare', () => {
  let stdout
  let stderr
  let cwd
  let packagePath
  let logger

  before(async () => {
    logger = { log: stub() }
    cwd = tempy.directory()
    packagePath = path.resolve(cwd, 'package.json')
    await outputJson(packagePath, {
      scripts: { build: 'mkdir build && touch index.html' }
    })
  })

  beforeEach(async () => {
    stdout = new WritableStreamBuffer()
    stderr = new WritableStreamBuffer()
  })

  it('Return SemanticReleaseError if "buildScriptName" option is not a String', async () => {
    try {
      await prepare({ buildScriptName: null }, { cwd, stdout, stderr, logger })
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EINVALIDBUILDSCRIPTNAME')
    }
  })

  it('Build assets', async () => {
    expect(
      await prepare(
        { buildScriptName: 'build' },
        { cwd, stdout, stderr, logger }
      )
    ).to.be.a('undefined')
  })

  it('Bypass build assets', async () => {
    expect(
      await prepare({ build: false }, { cwd, stdout, stderr, logger })
    ).to.be.a('undefined')
  })
})
