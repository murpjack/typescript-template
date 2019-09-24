const gulp = require('gulp');
const multiDest = require('gulp-multi-dest');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');


gulp.task('styles', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(multiDest(['dev/styles', 'dist/styles']));
});


let tsProject = ts.createProject("./tsconfig.json");
gulp.task('scripts', function() {
  let tsResult = gulp.src('src/ts/**/*.ts')
    .pipe(tsProject());

  return tsResult.js
    .pipe(multiDest(['dev/scripts', 'dist/scripts']));
});


gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.scss', gulp.parallel('styles'));
  gulp.watch('src/ts/**/*.ts', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('watch'));
