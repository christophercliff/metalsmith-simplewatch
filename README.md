# metalsmith-simplewatch

[![Build Status](https://travis-ci.org/christophercliff/metalsmith-simplewatch.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-simplewatch)

A development server for [Metalsmith][metalsmith].

## Installation

```
npm install metalsmith-simplewatch
```

## Usage

The `watch` function starts a developments server and rebuilds when source files are modified.

```js
var watch = require('metalsmith-simplewatch')

watch({
  buildFn: build,
  buildPath: path.resolve(__dirname, './build/'),
  srcPath: path.resolve(__dirname, './src/'),
})

function build() {
  Metalsmith().build()
}
```

### Options

- **`buildFn`** `Function`

    The build function. Will be invoked every time a watched file is modified. Required.

- **`buildPath`** `String`

    The absolute path to your build directory. Required.

- **`pattern`** `String|Array<String>`

    A [pattern][multimatch] to filter source files. Default `'**/*'`.

- **`port`** `Number`

    The port for the development server to listen on. Default `8000`.

- **`srcPath`** `String`

    The absolute path to your source directory. Serves as the root watch directory. Required.

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-simplewatch/blob/master/LICENSE.md) for details.

[connect]: https://www.npmjs.org/package/connect
[metalsmith]: http://www.metalsmith.io/
[minimatch]: https://github.com/isaacs/minimatch
