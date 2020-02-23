var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var pug = require('gulp-pug');



/* browser sync */
function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./public"
    }
  });
}

function browserReload(done) {
  browsersync.reload();
  templates();
  done();
}

/* html */
function templates () {
  return gulp
    .src(['./*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browsersync.stream());
}

/* scripts */
function scripts () {
  return gulp
    .src(['js/*.js', '!js/oldVersion.js'])
    .pipe(concat('index.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(browsersync.stream());
}

/* styles */
function scss () {
  return gulp
    .src(['./scss/*.scss'])
    .pipe(concat('style.css'))
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(browsersync.stream());
}



/* watch */
function watchFiles () {
  gulp.watch('./scss/*', scss);
  gulp.watch('./js/*', scripts);
  gulp.watch('./**/*.pug', browserReload);
}


gulp.task('watch', gulp.parallel(watchFiles, browserSync));
gulp.task('build', gulp.series(templates, scss, scripts));
