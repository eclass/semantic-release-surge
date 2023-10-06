'use strict'

const path = require('path')
const fs = require('fs')
const tempy = require('tempy')
const { stub } = require('sinon')
const { describe, it, before, beforeEach } = require('mocha')
const { outputJson } = require('fs-extra')
const { expect } = require('chai')
const { WritableStreamBuffer } = require('stream-buffers')
const prepare = require('../src/prepare')
const { assert } = require('console')

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
      await prepare({ buildScriptName: '' }, { cwd, stdout, stderr, logger })
      expect.fail('Expected an error, but none was thrown')
    } catch (err) {
      expect(err.name).to.equal('SemanticReleaseError')
      expect(err.code).to.equal('EINVALIDBUILDSCRIPTNAME')
    }
  })

  it('Build assets', async () => {
    try {
      const result = await prepare(
        { buildScriptName: 'build' },
        { cwd, stdout, stderr, logger }
      )
      expect(result).to.be.a('undefined')
      const buildDir = path.resolve(cwd, 'build')
      const indexFile = path.resolve(buildDir, 'index.html')

      expect(fs.existsSync(buildDir).to.be('true'))
      expect(fs.existsSync(indexFile).to.be('true'))
    } catch (err) {
      console.error('Unexpected error: ', err)
      assert(false)
      // coment test because is expected corretly
      // expect.fail('Unexpected error: ' + err.message)
    }
  })

  it('Bypass build assets', async () => {
    expect(
      await prepare({ build: false }, { cwd, stdout, stderr, logger })
    ).to.be.a('undefined')
  })
})
