'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rollup  = require('gulp-rollup');
const rollupPluginBabel = require('rollup-plugin-babel');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(rollup({
            output: {
                format: "iife"
            },
            plugins: [
                rollupPluginBabel({
                    "presets": [["@babel/env", { "modules": false }]],
                })
            ],
            input: './src/js/main.js'
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('sass:watch', function () {
    return gulp.watch('./src/scss/**/*.scss',  gulp.series('sass'));
});

gulp.task('js:watch', function () {
    return gulp.watch('./src/js/**/*.js',  gulp.series('js'));
});

gulp.task('build', gulp.parallel('js', 'sass'));

gulp.task('build:watch', gulp.parallel('js:watch', 'sass:watch'));

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});

gulp.task('server:watch', gulp.series('server', function () {
    browserSync.watch(`./dist/**/*.*`).on('change', browserSync.reload)
}));

gulp.task('watch', gulp.parallel('build:watch', 'server:watch'));
