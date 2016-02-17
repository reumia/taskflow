'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var notify     = require('gulp-notify');
var to5ify     = require('6to5ify');
var source     = require('vinyl-source-stream');

gulp.task('sass', function() {
    return gulp.src('./src/scss/app.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true
        }));
    gulp.start('default');
    gulp.watch('./src/js/*.js', ['default']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('browserify', function () {
    watchify(browserify('./src/js/app.js'))
        .transform(to5ify)
        .bundle()
        .on('error', function(err) {
            console.error(err.message);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify("Built Bundle"));
});

gulp.task('default', ['browserify']);