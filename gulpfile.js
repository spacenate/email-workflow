'use strict';

/*** Load plugins ***/
console.time("Plugins loaded");

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    emailBuilder = require('gulp-email-builder');

console.timeEnd("Plugins loaded");


/*** Define options ***/
var srcJade = ['jade/index.jade'],
    watchJade = ['jade/**/*.{jade,html}'],
    srcSass = ['sass/**/*.{sass,scss}'],
    sassOptions = {
        outputStyle: 'compressed'
    },
    jadeOptions = {
        pretty: false
    },
    emailOptions = {
        encodeSpecialChars: true,
        juice: {
            applyWidthAttributes: true,
            applyHeightAttributes: true,
            applyAttributesTableElements: true
        }
    };


/*** Define tasks ***/
gulp.task('sass', function() {
    // Returning a promise prevents 'build' from starting before 'sass' completes
    return gulp.src(srcSass)
        .pipe(sass.sync(sassOptions).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Make 'sass' a dependency so it runs before 'build'
gulp.task('build', ['sass'], function() {
    return gulp.src(srcJade)
        .pipe(jade(jadeOptions))
        .pipe(emailBuilder(emailOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    gulp.watch(watchJade, ['build']);
    gulp.watch(srcSass, ['build']);
});

gulp.task('buildAndWatch', ['build', 'watch'], function() {
    // Start browser-sync
    var browserSync = require('browser-sync').create();
    var log = require('connect-logger');
    // Stolen from John Papa's lite-server
    // https://github.com/johnpapa/lite-server
    var bsOptions = {
        files: 'dist/*.html',
        server: {
            baseDir: '.',
            index: 'dist/index.html',
            middleware: [
                log({format: '%date %status %method %url'})
            ]
        }
    };
    browserSync.init(bsOptions);
});

gulp.task('setSendOptions', function() {
    // Copy any settings from emailconfig.json
    var config = require('./emailconfig.json');
    for (var attrname in config) {
        emailOptions[attrname] = config[attrname];
    }
});

// Though these technically run asynchronously, 'setSendOptions' always completes
// before 'build's dependencies do
gulp.task('send', ['setSendOptions', 'build']);

gulp.task('default', ['buildAndWatch']);
