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
      console.info('加载success!')
    })
    .on('crash', function() {
      console.error('应用退出!\n')
      stream.emit('restart', 10)
    })
})

gulp.task('compile', ['clear'], function () {console.log('打包开始'.green)})
gulp.task('buildEnd', function () {console.log('打包完成'.green)})

gulp.task('clear', () => {
  del(['./dist'])
})

gulp.task('run', ['server'])
gulp.task('build', ['compile'])