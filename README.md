# metalsmith-simplewatch

[![Build Status](https://travis-ci.org/christophercliff/metalsmith-simplewatch.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-simplewatch)

A watch plugin for [Metalsmith][metalsmith].

## Installation

```
npm install metalsmith-simplewatch
```

### Options

- **`pattern`** `String pattern|Array<String> pattern`

    A [pattern][multimatch] to match watched files. Default `**/*`.

## Usage

Pair with [connect][connect] to create a Metalsmith development server.

```js
var connect = require('connect')
var path = require('path')
var static = require('serve-static')
var watch = require('metalsmith-simplewatch')

Metalsmith(__dirname)
  .use(watch())
  .build()

connect()
  .use(static(path.resolve(__dirname, './build/')))
  .listen(8000)
```

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-simplewatch/blob/master/LICENSE.md) for details.

[connect]: https://www.npmjs.org/package/connect
[metalsmith]: http://www.metalsmith.io/
