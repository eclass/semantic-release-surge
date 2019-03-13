# @eclass/semantic-release-surge

[![npm](https://img.shields.io/npm/v/@eclass/semantic-release-surge.svg)](https://www.npmjs.com/package/@eclass/semantic-release-surge)
[![build](https://img.shields.io/travis/eclass/semantic-release-surge.svg)](https://travis-ci.org/eclass/semantic-release-surge)
[![downloads](https://img.shields.io/npm/dt/@eclass/semantic-release-surge.svg)](https://www.npmjs.com/package/@eclass/semantic-release-surge)
[![dependencies](https://img.shields.io/david/eclass/semantic-release-surge.svg)](https://david-dm.org/eclass/semantic-release-surge)
[![devDependency Status](https://img.shields.io/david/dev/eclass/semantic-release-surge.svg)](https://david-dm.org/eclass/semantic-release-surge#info=devDependencies)
[![Test Coverage](https://api.codeclimate.com/v1/badges/38a9a51f770ddafa4182/test_coverage)](https://codeclimate.com/github/eclass/semantic-release-surge/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/38a9a51f770ddafa4182/maintainability)](https://codeclimate.com/github/eclass/semantic-release-surge/maintainability)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> [semantic-release](https://github.com/semantic-release/semantic-release) plugin to publish a static site with [surge.sh](https://surge.sh)

| Step               | Description        |
|--------------------|--------------------|
| `verifyConditions` | Verify the presence of the `SURGE_TOKEN` environment variable and `SURGE_ALIAS` environment variable or `alias` option. |
| `prepare`          | Build assets with a npm script. |
| `publish`          | Upload assets to surge.sh. |

## Install

```bash
npm i -D @eclass/semantic-release-surge
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/caribou/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    "@eclass/semantic-release-surge"
  ]
}
```

## Configuration

### Surge authentication

The surge authentication configuration is **required** and can be set via [environment variables](#environment-variables).

### Environment variables

| Variable      | Description                                                                             |
| ------------- | --------------------------------------------------------------------------------------- |
| `SURGE_TOKEN` | Surge token created via [surge token](https://surge.sh/help/integrating-with-travis-ci) |
| `SURGE_ALIAS` | Optional set surge alias. Example `my-awesome-project.surge.sh`                         |
| `SURGE_CNAME` | Optional set surge custom CNAME. Example `my-awesome-project.io`                        |

### Options

| Options           | Description                              | Default |
|-------------------|------------------------------------------|---------|
| `alias`           | Set de custom alias to surge.sh project. | null    |
| `buildScriptName` | npm script to build assets.              | `build` |
| `build`           | Indicate if is requerid build assets.    | `false` |
| `asstes`          | Indicate the assets directory.           | `dist` |

### Examples

The `build` and `asstes` option can be used to skip the build assets:

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    ["@semantic-release/exec", {
      "publishCmd": "npm run build"
    }],
    ["@eclass/semantic-release-surge", {
      "alias": "my-awesome-project.surge.sh",
      "assets": "build",
      "build": false,
    }]
  ]
}
```

Is posible specificate a custom npm script build and a custom CNAME:

```json
{
  "plugins": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/gitlab",
    ["@eclass/semantic-release-surge", {
      "alias": "my-awesome-project.surge.sh",
      "cname": "my-awesome-project.io",
      "buildScriptName": "build:client"
    }]
  ]
}
```
```json
{
  "scripts": {
    "build:client": "react-scripts build"
  }
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
