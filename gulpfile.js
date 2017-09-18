"use strict";

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    runSeq = require('run-sequence'),
    //config = require("./project-config"),
    symdest = require('gulp-symdest'),
    electron = require('gulp-atom-electron');

/**
 * Cleans our distribution folder
 */
gulp.task('electron:clean', function () {
    return del('dist/**/*', {force: true});
});

/**
 * Copies the following into the distribution folder:
 *  1. Node modules that are needed for distribution
 *  2. Bower packages needed for distribution
 *  3. Any other remaining files in our `src`
 *     directory
 */
gulp.task('electron:copy', () => {
    var fs_setup = [
        { // copy assets from our source to distribution
            from: ['./src/**/*', '!./src/**/*.scss', '!./src/**/*.ts'],
            to: './dist'
        }
    ];

    // config.VENDOR_FILES.forEach((item) => {
    //     let SOURCE = item.source;
    //     let FILES = SOURCE.concat("/").concat(item.files);

    //     fs_setup.push({
    //         from: `node_modules/${FILES}`,
    //         to: `./dist/assets/vendor/${SOURCE}`
    //     })
    // });


    return fs_setup.map((setup) => {
        return gulp.src(setup.from).pipe(gulp.dest(setup.to));
    });
});

/**
 * Transpiles our Sass classes into CSS and
 * places it in the matching folder hierarchy in
 * the distribution folder.
 */
gulp.task('electron:transpile:sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

/**
 * Watches our Sass files for changes
 * and transpiles edited files and places
 * them in the distribution folder.
 */
gulp.task("sass:watch", function () {
    gulp.watch('./src/**/*.scss', ['electron:transpile:sass']);
});

/**
 * Transpiles TypeScript to JavaScript
 */
gulp.task('electron:transpile:ts', shell.task(['tsc']));

/**
 * Watches our TypeScript files, invoking the `tsc` compiler
 * if changes are detected.
 */
gulp.task("typescript:watch", function () {
    gulp.watch('./src/**/*.ts', ['electron:transpile:ts']);
});

/**
 * Builds the OSX application and places it in our
 * 'packages' folder
 */
// gulp.task('electron:build:osx', function () {
//     gulp.src(['dist/**/*'])
//         .pipe(electron({
//             version: '1.3.3',
//             platform: 'darwin'
//         }))
//         .pipe(symdest('packages/osx'));
// });

// /**
//  * Builds the Linux application and places it in our
//  * 'packages' folder
//  */
// gulp.task('electron:build:linux', function () {
//     gulp.src(['dist/**/*'])
//         .pipe(electron({
//             version: '1.3.3',
//             platform: 'linux'
//         }))
//         .pipe(symdest('packages/linux'));
// });

/**
 * Builds the Windows executable file and places it in our
 * 'packages' folder
 */
gulp.task('electron:build:win', function () {
    gulp.src(['dist/**/*'])
        .pipe(electron({
            version: '1.0',
            platform: 'win32'
        }))
        .pipe(symdest('packages/win'));
});

/**
 * Umbrella task for executing our build
 */
gulp.task('electron:build', function (done) {
    return runSeq('electron:clean', 'electron:copy', 'electron:transpile:sass', 'electron:transpile:ts', done);
});

/**
 * Task for packing our application for OS distribution
 */
gulp.task('electron:package', (done) => {
    return runSeq('build',
        ['electron:build:win'], done);
});

gulp.task('build', ['electron:build']);

gulp.task('default', ['build']);