require('babel-register')();

import gulp from 'gulp';

import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import del from 'del';
import opn from 'opn';
import srcStream from 'vinyl-source-stream';
const $ = gulpLoadPlugins();

function lint(files, options) {
    return () => {
        return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
    };
}

gulp.task('clean', del.bind(null, ['demo.bundle.js']));

gulp.task('lint', lint(['js/index.js']));



gulp.task('build', ['clean', 'lint'], () => {
    return browserify({
        entries: 'js/index.js',
        debug: true,
        transform: [babelify]
    }).bundle()
    .pipe(srcStream('demo.bundle.js'))
    .pipe(gulp.dest('js'));

});

gulp.task('server', ['build'], () => {
    return $.connect.server({
        port: 9000,
        root: '.',
        livereload: true
    });
});
gulp.task('demo', ['server', 'watch'], () => {
    opn('http://localhost:9000');
});

gulp.task('watch', () => {
    gulp.watch(['js/index.js'], ['build']);
    gulp.watch(['index.html', 'js/demo.bundle.js']).
    on('change', (file) => {
        gulp.src(file.path)
            .pipe($.connect.reload());
    });
});
