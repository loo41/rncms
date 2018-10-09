const gulp = require('gulp')
const path = require('path')
const nodemon = require('gulp-nodemon')
const del = require('del')
const exec = require('child_process').exec
const colors = require('colors')

gulp.task('server', function() {
  let stream = nodemon({ script: `${path.join(__dirname, 'app.js')}`
          , ext: 'html js'
          , ignore: ['src/admin']
          , tasks: [] })
  stream
    .on('restart', function () {
      console.log('加载success!')
    })
    .on('crash', function() {
      console.error('应用退出!\n')
      stream.emit('restart', 10)
    })
})

gulp.task('compile', ['clear'], () => {
  exec('webpack --config ./build/webpack.prod.conf.js', function (err, info) {
    if (err) console.log(err)
    console.log(info.green)
  })
})

gulp.task('clear', () => {
  del(['./dist'])
})

gulp.task('run', ['server'])
gulp.task('build', ['compile'])