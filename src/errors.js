'use strict'

const pkg = require('../package.json')

const [homepage] = pkg.homepage.split('#')
const linkify = file => `${homepage}/blob/master/${file}`

module.exports = {
  EINVALIDASSETS: ({ assets }) => ({
    message: 'Invalid `assets` option.',
    details: `The [assets option](${linkify(
      'README.md#assets'
    )}), if defined, must be a \`String\`.

Your configuration for the \`assets\` option is \`${assets}\`.`
  }),
  EINVALIDBUILDSCRIPTNAME: ({ buildScriptName }) => ({
    message: 'Invalid `buildScriptName` option.',
    details: `The [buildScriptName option](${linkify(
      'README.md#buildscriptname'
    )}), if defined, must be a \`String\`.

Your configuration for the \`buildScriptName\` option is \`${buildScriptName}\`.`
  }),
  ENOSURGETOKEN: () => ({
    message: 'No surge token specified.',
    details: `An [surge token](${linkify(
      'README.md#surge-authentication'
    )}) must be created and set in the \`SURGE_TOKEN\` environment variable on your CI environment.

Please make sure to create an [npm token](https://surge.sh/help/integrating-with-travis-ci) with \`surge token\` and to set it in the \`SURGE_TOKEN\` environment variable on your CI environment. The token must allow to publish to surge.sh.`
  }),
  EINVALIDALIAS: ({ alias }) => ({
    message: 'Invalid `alias` option.',
    details: `The [alias option](${linkify(
      'README.md#alias'
    )}), if defined, must be a \`String\`.

You can set \`SURGE_ALIAS\` environment variable on your CI environment.
Your configuration for the \`assets\` option is \`${alias}\`.`
  })
}
