const gulp = require('gulp');
const util = require('gulp-util');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const refresh = require('gulp-refresh');
const gulpSequence = require('gulp-sequence');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json', { watch: false });
const del = require('del');
const inject = require('gulp-inject');
const file = require('gulp-file');
const watch = require('gulp-watch');

/**
 * Transforms app.less -> app.css in dist directory
 */
gulp.task('less:development', () => {
  return gulp.src('src/app.less')
    .pipe(plumber(function (error) {
      util.log(error.message);
      this.emit('end');
    }))
    .pipe(less())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'))
    .pipe(refresh());
});

/**
 * Creates the Imports.less file that inject-less uses.
 */
gulp.task('less-imports', () => {
  var str = '// injector\n// endinjector';

  return file('imports.less', str, { src: true })
    .pipe(gulp.dest('./src'));
});

/**
 * Injects all .less files into imports.less
 */
gulp.task('inject-less', () => {
  var target = gulp.src('./src/imports.less');
  var sources = gulp.src(['./src/**/*.less', '!./src/app.less', '!./src/imports.less', '!./src/variables.less'], { read: false });

  var options = {
    starttag: '// injector',
    endtag: '// endinjector',
    ignorePath: '/src/',
    addRootSlash: false
  };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest('./src'));
});

gulp.task('typescript', () => {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

/**
 * Injects all application .js files into index.html
 */
gulp.task('inject-js', () => {
  var target = gulp.src('./index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(
    [
      'dist/utils/AngularClass.js',
      'dist/app.js',
      '!dist/main.js',
      'dist/**/*.js'
    ],
    {
      read: false
    }
  );

  var options = {
    starttag: '<!-- injector:js -->',
    endtag: '<!-- endinjector -->',
    addRootSlash: false
  };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest('.'));
});

/**
 * Deletes the .tmp and dist directory,
 * and the Imports.less file.
 */
gulp.task('clean', () => {
  return del(['dist', './src/imports.less',]);
});

/**
 * waits for 4s
 */
gulp.task('wait', (done) => {
  setTimeout(() => {
    done();
  }, 4000)
});

/**
 * Watches changes in less files and starts less task.
 */
gulp.task('watch-less', () => {
  watch(['**/*.less'], () => {
    gulp.start('less:development');
  });
});

gulp.task('watch-ts', () => {
  var sources = [
    './src/**/*.ts',
    '!./src/**/*.spec.ts'
  ];
  watch(sources, () => {
    gulp.start('typescript');
  });
  // return watch(sources).on('change', (file) => {
  //   // We first convert to relative path
  //   var splitted = file.split('client');
  //   _babelSrcFile = '.' + splitted[1];
  //   gulp.start('babel');
  // });

});

/**
 * Copies index.html and more to .tmp folder
 */
// gulp.task('copy-to-dist', () => {
//   gulp.src('./src/index.html')
//     .pipe(gulp.dest('./dist'));

gulp.task('serve', gulpSequence(
  'clean',
  'less-imports',
  'inject-less',
  'typescript',
  'inject-js',
  'less:development',
  'wait',
  'watch-less',
  'watch-ts'
));