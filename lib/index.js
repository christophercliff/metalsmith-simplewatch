var _ = require('lodash')
var assert = require('assert')
var connect = require('connect')
var Gaze = require('gaze').Gaze
var serveStatic = require('serve-static')

var DEFAULT_PATTERN = '**/*'
var DEFAULT_PORT = 8000

module.exports = watch

function watch(options) {
    assert(_.isFunction(options.buildFn))
    assert(_.isString(options.buildPath))
    assert(_.isString(options.srcPath))
    var buildFn = options.buildFn
    var srcPath = options.srcPath
    var buildPath = options.buildPath
    var pattern = options.pattern || DEFAULT_PATTERN
    var port = options.port || DEFAULT_PORT
    var gaze = new Gaze(pattern, {
        cwd: srcPath,
        mode: 'poll',
    })
    connect()
        .use(serveStatic(buildPath))
        .listen(port, function () {
            console.log('running on port %s', port)
        })
    gaze.on('error', function (err) {
            gaze.close()
            throw err
        })
        .on('all', function () {
            console.log('rebuilding...')
            return process.nextTick(buildFn)
        })
        .on('ready', function () {
            console.log('watching: ', srcPath)
            return process.nextTick(buildFn)
        })
}
