'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('./src/scss/app.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./src/css/maps'))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);