'use strict';
const gulp = require('gulp'),
    gulpJsdoc2md = require('gulp-jsdoc-to-markdown'),
    rename = require('gulp-rename'),
    istanbul = require('gulp-istanbul'),
    istanbulHarmony = require('istanbul'),
    mocha = require('gulp-mocha'),
    eslint = require('gulp-eslint'),
    git = require('gulp-git');

const files = ['*.js', '!./gulpfile.js', '!node_modules/**', '!test/**'],
    docs = ['README.md', 'docs/**/*.md'],
    tests = ['test/**/*.js'];

const JobNumber = process.env.TRAVIS_JOB_NUMBER,
    runDocs = !JobNumber || /[.]1$/.test(JobNumber);

/**
 * Pull git branch locally (solves detached head issue in CI)
 */
gulp.task('gitBranch', (done) => {
    let complete = false;
    const branch = process.env.TRAVIS_BRANCH;
    // Abort(successfully) early if not running in CI
    if (!(JobNumber && runDocs && branch)) {
        return done();
    }
    git.checkout(branch, () => {
        // Make sure we have full log history.
        git.pull('origin', branch, {}, () => {
            if (!complete) {
                done();
            }
            complete = true;
        });
    });
});

/**
 * Generate API documentation for all js files, place markup in the correct folder for readthedocs.org
 */
gulp.task('docs', ['gitBranch'], (done) => {
    // Abort(successfully) early if running in CI and not job #1
    if (!runDocs) {
        return done();
    }
    gulp.src(files)
        .pipe(gulpJsdoc2md({}))
        .on('error', done)
        .pipe(rename((path) => {
            path.extname = '.md';
        }))
        .pipe(gulp.dest('docs/api'))
        .on('finish', done);
});

/**
 * Run all js files through eslint and report status.
 */
gulp.task('lintCore', () => {
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Run all tests through eslint and report status.
 */
gulp.task('lintTests', () => {
    return gulp.src(tests)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/**
 * Set git username/email to CI user
 */
gulp.task('gitConfig', (done) => {
    // Abort(successfully) early if not running in CI
    if (!JobNumber) {
        return done();
    }
    git.exec({
        args: 'config user.name "Travis-CI"'
    }, () => {
        git.exec({
            args: 'config user.email "Travis-CI@servercooties.com"'
        }, () => {
            done();
        });
    });
});

/**
 * Commit generated documentation to be picked up by readthedocs.org
 *
 * Add CI tag to commit to prevent CI jobs from being created by checking in docs
 */
gulp.task('commitDocs', ['gitConfig'], (done) => {
    gulp.src(docs)
        .pipe(git.add())
        .pipe(git.commit('Automatically push updated documentation [ci skip]'))
        .on('error', () => 0)
        .on('finish', done);
});

/**
 * Commit and push docs to github to be picked up by readthedocs.org
 */
gulp.task('pushDocs', ['gitConfig', 'commitDocs'], (done) => {
    //Abort(successfully) early if running in CI and not job #1
    if (!runDocs) {
        return done();
    }
    git.addRemote('github', 'https://github.com/RaceProUK/SockBot-Markov.git', (e) => {
        if (e) {
            done();
        } else {
            git.push('github', 'HEAD', {
                args: ['-q']
            }, () => {
                done();
            });
        }
    });
});

/**
 * Run code coverage instrumented tests
 */
gulp.task('test', ['lintCore', 'lintTests'], (done) => {
    gulp.src(files)
        // Instrument code files with istanbulHarmony
        .pipe(istanbul({
            instrumenter: istanbulHarmony.Instrumenter,
            includeUntested: true
        }))
        // hook require function for complete code coverage
        .pipe(istanbul.hookRequire())
        .on('finish', () => {
            // Run all tests
            gulp.src(tests)
                .pipe(mocha({
                    reporter: 'dot'
                }))
                .on('error', done)
                // Write code coverage reports
                .pipe(istanbul.writeReports())
                .on('finish', done);
        });
});

// Meta tasks
gulp.task('buildDocs', ['docs'], () => 0);
gulp.task('preBuild', ['buildDocs'], () => 0);
gulp.task('postBuild', ['pushDocs'], () => 0);
gulp.task('default', ['lint'], () => 0);
gulp.task('lint', ['lintCore', 'lintTests'], () => 0);
