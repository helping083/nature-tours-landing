const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix:'@@'
    }))
    .pipe(dest('dist'))

}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(dest('dist/css'))
}

function clear() {
  return del('dist');
}

function images() {
  return src('src/img/**/*.{png,svg,jpg,ico}')
          .pipe(dest('dist/img'))
}

function serve() {
  browserSync.init({
    server: './dist'
  })
  watch('src/**.html', series(html)).on('change', browserSync.reload);
  watch('src/scss/**/*.scss', series(scss)).on('change', browserSync.reload);
}


exports.html = html;
exports.scss = scss;
exports.build = series(clear, scss, html);
exports.serve = series(clear, images,scss, html ,serve);