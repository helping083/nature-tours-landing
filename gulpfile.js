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

function icons() {
  return src('src/scss/fonts/*.+(eot|svg|ttf|woff)')
          .pipe(dest('dist/css/fonts'))
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
  return src('src/img/**/*.{png,svg,jpg,ico,mp4,webm}')
          .pipe(dest('dist/img'))
}

function serve() {
  browserSync.init({
    server: './dist'
  })
  watch('src/**.html', series(html)).on('change', browserSync.reload);
  watch('src/scss/**/*.scss', series(scss)).on('change', browserSync.reload);
}

exports.serve = series(clear, images,scss, icons,html ,serve);