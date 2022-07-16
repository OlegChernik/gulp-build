const gulp = require('gulp');
const less = require('gulp-less')
const rename = require('gulp-rename')
const clean = require('gulp-clean-css')
const babel = require('gulp-babel')
const unglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js'
    }

}


function clear() {
    return del(['dist'])
}

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(clean())
    .pipe(rename({
        basename: 'main',
        suffix: '.min',
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

function javaScript() {
    return gulp.src(paths.scripts.src, {
        sourcemaps:true
    })
    .pipe(babel())
    .pipe(unglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))


}

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, javaScript) 
}

const build = gulp.series(clear,gulp.parallel(styles, javaScript), watch)

exports.clear = clear
exports.styles = styles
exports.javaScript = javaScript
exports.watch = watch
exports.build = build



