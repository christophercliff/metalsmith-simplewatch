var Gaze = require('gaze').Gaze

var DEFAULT_PATTERN = '**/*'

var gaze

module.exports = plugin

function plugin(options) {
    options = options || {}
    var pattern = options.pattern || DEFAULT_PATTERN
    return function (files, metalsmith, done) {
        var src = metalsmith.source()
        console.log('starting watcher...')
        gaze = new Gaze(pattern, {
            cwd: src,
            mode: 'poll'
        })
        gaze.on('error', function(err){
                gaze.close()
                throw err
            })
            .on('all', function(){
                console.log('rebuilding...')
                gaze.close()
                metalsmith.build()
            })
            .on('ready', function(){
                console.log('watching: ', src)
                return done(null)
            })
    }
}
