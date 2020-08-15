const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');

function buildDist(cb) {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
  });
  const tsResult = tsProject.src().pipe(tsProject());

  tsResult.dts.pipe(gulp.dest('es'));
  tsResult.js.pipe(gulp.dest('es'));
  cb();
}

function buildDistCJS(cb) {
  const tsProject = ts.createProject('tsconfig.json', {
    declaration: true,
  });
  const tsResult = tsProject.src().pipe(tsProject());

  tsResult.dts.pipe(gulp.dest('cjs'));
  tsResult.js
    .pipe(
      babel({
        plugins: ['transform-es2015-modules-simple-commonjs'],
      })
    )
    .pipe(gulp.dest('cjs'));
  cb();
}

module.exports = {
  build: gulp.parallel(buildDist, buildDistCJS),
};
