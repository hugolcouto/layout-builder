const gulp          = require('gulp');
const sass          = require('gulp-sass');
const rename        = require('gulp-rename')
const uglify        = require('gulp-uglify-es').default
const watch         = require('gulp-watch');
const livereload    = require('gulp-livereload');
const webserver     = require('gulp-webserver');
const concat        = require('gulp-concat');
const pug           = require('gulp-pug');
const imagemin      = require('gulp-imagemin');

gulp.task('sass', () => {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(livereload())
});

gulp.task('pug', () => {
    return gulp.src(['./source/views/**/*.pug'])
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('./build'))
      .pipe(livereload())
});

gulp.task('concat', () => {
    return gulp.src(['./source/js/structure/open_jquery_tag.js', './source/js/scripts/**/*.js', './source/js/structure/close_jquery_tag.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./source/js/compiled'))
        .pipe(livereload())
});

gulp.task('uglify', () => {
    return gulp.src('./source/js/compiled/**/*.js')
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js'))
        .pipe(livereload())
})

gulp.task('imagemin', () => {
    gulp.src('./source/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets/img'))
        .pipe(livereload())
})

gulp.task('watch', () => {
    livereload.listen()
    gulp.watch('./source/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./source/views/**/*.pug', gulp.parallel('pug'))
    gulp.watch('./source/img/**/*', gulp.parallel('imagemin'))
    gulp.watch('./source/js/scripts/**/*.js', gulp.series(['concat', 'uglify']))
});

gulp.task('webserver', () => {
    gulp.src('./build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', gulp.parallel('sass', 'pug', 'imagemin', 'uglify', 'concat', 'watch', 'webserver'));