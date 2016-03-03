var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('default', function() {
});

gulp.task('serve', function() {
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
