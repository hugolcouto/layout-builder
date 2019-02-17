const gulp          = require('gulp');
const sass          = require('gulp-sass');
const rename        = require('gulp-rename')
const uglify        = require('gulp-uglify-es').default
const watch         = require('gulp-watch');
const livereload    = require('gulp-livereload');
const webserver     = require('gulp-webserver');
const concat        = require('gulp-concat');
const pug           = require('gulp-pug');
const clean         = require('gulp-clean');

gulp.task('sass', () => {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload())
});

gulp.task('pug', () => {
    return gulp.src('./source/views/**/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest('.'))
      .pipe(livereload())
  });

gulp.task('concat', () => {
    return gulp.src('./source/js/source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./source/js/build'))
        .pipe(livereload())
});

gulp.task('uglify', () => {
    return gulp.src('./source/js/build/**/*.js')
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(livereload())
})

gulp.task('watch', () => {
    livereload.listen()
    gulp.watch('./source/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./source/views/**/*.pug', gulp.parallel('pug'))
    gulp.watch('./source/js/source/**/*.js', gulp.parallel('concat'))
    gulp.watch('./source/js/build/**/*.js', gulp.parallel('uglify'))
});

gulp.task('webserver', () => {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('clean', () => {
    return gulp.src('**/*.txt', {read: false}).pipe(clean());
});

gulp.task('default', gulp.parallel('sass', 'pug', 'uglify', 'concat', 'watch', 'webserver', () => console.log("YOUR ARE RUNNING THE PROJECT IN DEVELOPMENT MODE. TO UPLOAD JUST THE PRODUCTION FILES, JUST ADD THE BUILD DIRECTORY ON GIT_IGNORE")));