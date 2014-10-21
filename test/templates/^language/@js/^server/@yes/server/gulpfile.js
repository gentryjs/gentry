'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var reload = require('gulp-livereload');
var awatch = require('gulp-autowatch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserify = require('browserify');

var paths = {
  html: './client/*html',
  stylus: './client/**/*.styl',
  public: './public',
  src: './client/start.js'
};


gulp.task('browserify', function(){
  var bCache = {};
  var b = browserify(paths.src, {
    debug: true,
    insertGlobals: false,
    cache: bCache,
    extensions: ['.js']
  });
  b.bundle()
  .pipe(source('start.js'))
  .pipe(buffer())
  .pipe(gulp.dest(paths.public))
  .pipe(reload());
});

gulp.task('html', function(){
  gulp.src(paths.html);
});

gulp.task('server', function() {
  require('./server/start');
});


gulp.task('stylus', function(){
  gulp.src(paths.stylus)
  .pipe(stylus())
  .pipe(concat('app.css'))
  .pipe(gulp.dest(paths.public))
  .pipe(reload());
});

gulp.task('watch', function(){
  awatch(gulp, paths);
});

gulp.task('default', ['browserify', 'html', 'stylus', 'watch', 'server']);
