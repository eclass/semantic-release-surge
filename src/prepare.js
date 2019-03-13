'use strict'

const readPkg = require('read-pkg')
const execa = require('execa')
const getError = require('./get-error')

module.exports = async (
  { buildScriptName = 'build', build = true },
  { cwd, env, stdout, stderr, logger }
) => {
  const pkg = await readPkg({ cwd })
  if (!pkg.scripts && !pkg.scripts[buildScriptName]) {
    throw getError('EINVALIDBUILDSCRIPTNAME', { buildScriptName })
  }
  if (build) {
    logger.log(`Build assets with "npm run ${buildScriptName}"`)

    const buildResult = execa('npm', ['run', buildScriptName], { cwd, env })
    buildResult.stdout.pipe(
      stdout,
      { end: false }
    )
    buildResult.stderr.pipe(
      stderr,
      { end: false }
    )

    try {
      await buildResult
    } catch (err) {
      throw getError('EINVALIDBUILDSCRIPTNAME', { buildScriptName })
    }
  }
}
