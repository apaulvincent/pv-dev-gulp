var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var compass = require('gulp-compass');

var open = require('gulp-open');
var plumber = require('gulp-plumber');
var fileinclude = require('gulp-file-include');


gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('styles', function() {
  return sass('css/sass', { style: 'expanded' })
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});


// Choose whether to use compass or sass...
gulp.task('compass', function() {
  gulp.src('./css/sass/**.*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'css', // same path as config.rb dunno why...
      sass: 'css/sass' // same path as config.rb dunno why...
    }))

    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});


gulp.task('inc', function() {
  gulp.src(['temp/*.html'])
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        name: ''
      }
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('open', function(){
  var options = {
    app: 'chrome',
    uri: 'http://localhost:4000'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('watch', function() {
  gulp.watch('css/**/*.scss', ['compass']); // compass
  gulp.watch(['temp/*.html', 'inc/*.html'], ['inc']); // compass
  gulp.watch(['*.html', 'email/*.html'], notifyLiveReload);
  gulp.watch('js/*.js', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('default', ['express', 'open', 'compass', 'livereload', 'watch'], function() {
  console.log('Site is ready...');
});