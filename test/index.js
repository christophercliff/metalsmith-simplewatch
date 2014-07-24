var assertDir = require('assert-dir-equal')
var fs = require('fs')
var watch = require('../')
var Metalsmith = require('metalsmith')
var mkdirp = require('mkdirp')
var path = require('path')
var rimraf = require('rimraf')

describe('metalsmith-simplewatch', function(){

    var srcPath = path.resolve(__dirname, './fixtures/basic/src/')
    var buildPath = path.resolve(__dirname, './fixtures/basic/build/')
    var expectedPath = path.resolve(__dirname, './fixtures/basic/expected/')

    beforeEach(function(){
        rimraf.sync(srcPath)
        mkdirp.sync(srcPath)
        fs.writeFileSync(path.resolve(srcPath, 'a.js'))
        console.log('setup finished')
    })

    it('should rebuild when a file is changed', function(done){
        Metalsmith('test/fixtures/basic')
            .use(watch())
            .build(function(err){
                if (err) return done(err)
                assertDir(srcPath, buildPath)
                fs.renameSync(path.resolve(srcPath, './a.js'), path.resolve(srcPath, './b.js'))
                assertDir(expectedPath, buildPath)
                return done(null)
        })
    })

})
