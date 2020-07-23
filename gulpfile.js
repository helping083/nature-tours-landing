const gulp = require('gulp');
let browserSync = require("browser-sync").create();
gulp.task('hello', function() {
  console.log('Hello Zell');
});
gulp.task('serve', function() {
  browserSync.init({
    server: "./"
  });
});