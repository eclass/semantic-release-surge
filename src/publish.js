'use strict'

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const execa = require('execa')
const getError = require('./get-error')

const stat = promisify(fs.stat)

module.exports = async (
  { assets = 'dist', alias, cname = null },
  { cwd, env, stdout, stderr, logger }
) => {
  logger.log(`Upload assets with alias ${alias}`)
  try {
    await stat(path.join(cwd, assets))
    const publishResult = execa('surge', [assets, alias], { cwd, env })
    publishResult.stdout.pipe(
      stdout,
      { end: false }
    )
    publishResult.stderr.pipe(
      stderr,
      { end: false }
    )
    await publishResult
    if (cname) {
      const publishCnameResult = execa('surge', [assets, cname], {
        cwd,
        env
      })
      publishCnameResult.stdout.pipe(
        stdout,
        { end: false }
      )
      publishCnameResult.stderr.pipe(
        stderr,
        { end: false }
      )

      await publishCnameResult
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw getError('EINVALIDASSETS', { assets })
  }
}
