'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var server = require('gulp-webserver');

gulp.task('sass', function() {
    return gulp.src('./src/scss/app.scss')
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('server', function() {
    gulp.src('./')
        .pipe(server({
            livereload: false,
            directoryListing: false,
            open: false,
            port: '3000',
            fallback: 'app.html'
        }));
});

gulp.task('default', ['server','watch']);