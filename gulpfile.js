var gulp = require('gulp');

var gls = require('gulp-live-server');

// This is used for CSS
var concat = require('gulp-continuous-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

// We want to run certain tasks only when in production
var environments = require('gulp-environments');
var dev = environments.development;
var prod = environments.production;

gulp.task('default', function() {
});

gulp.task('compile-scss', function() {
  gulp.src([
      'app/stylesheets/**/*.scss',
      '!app/stylesheets/**/_*.scss'
    ])
    .pipe(watch('app/stylesheets/**/*.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ indentedSyntax: false, errLogToConsole: true }))
    .pipe(concat('application.css'))
    .pipe(prod(minifyCss()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/stylesheets'))
});


gulp.task('serve', ['compile-scss'], function() {
  //1. run your script as a server
  var server = gls.new('app.js');
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['static/**/*.css', 'static/**/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });

  // Restart the server
  gulp.watch('myapp.js', function() {
    server.start.bind(server)()
  });
});
