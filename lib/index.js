var Gaze = require('gaze').Gaze

var gaze

module.exports = plugin

function plugin() {
    return function (files, metalsmith, done) {
        var pattern = '**/*'
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
