var _ = require('lodash')
var assertDir = require('assert-dir-equal')
var BPromise = require('bluebird')
var fs = require('fs')
var watch = require('../')
var Metalsmith = require('metalsmith')
var mkdirp = require('mkdirp')
var path = require('path')
var rimraf = require('rimraf')

describe('metalsmith-simplewatch', function () {

    this.timeout(6e3)

    var srcPath = path.resolve(__dirname, './fixtures/basic/src/')
    var buildPath = path.resolve(__dirname, './fixtures/basic/build/')
    var expectedPath = path.resolve(__dirname, './fixtures/basic/expected/')

    beforeEach(function () {
        rimraf.sync(srcPath)
        mkdirp.sync(srcPath)
        fs.writeFileSync(path.resolve(srcPath, 'a.js'), '')
    })

    it('should rebuild when a file is changed', function (done) {
        done = _.once(done)
        var timesBuilt = 0
        watch({
            buildFn: build,
            buildPath: buildPath,
            srcPath: srcPath,
        })
        BPromise
            .delay(2e3)
            .then(function () {
                timesBuilt.should.equal(1)
                assertDir(srcPath, buildPath)
            })
            .catch(done)
            .then(function () {
                fs.renameSync(path.resolve(srcPath, './a.js'), path.resolve(srcPath, './b.js'))
            })
            .delay(2e3)
            .then(function () {
                timesBuilt.should.equal(2)
                assertDir(expectedPath, buildPath)
            })
            .catch(done)
            .then(done)
        function build() {
            timesBuilt++
            (new Metalsmith('test/fixtures/basic')).build()
        }
    })

})
