const   gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        rename          = require('gulp-rename')
        uglify          = require('gulp-uglify-es').defaul,
        watch           = require('gulp-watch'),
        livereload      = require('gulp-livereload'),
        webserver       = require('gulp-webserver'),
        concat          = require('gulp-concat'),
        pug             = require('gulp-pug'),
        imagemin        = require('gulp-imagemin'),
        replace         = require('gulp-string-replace'),

gulp.task('sass', () => {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(livereload())
});

gulp.task('pug', () => {
    return gulp.src('./source/views/**/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(rename(path => {
        path.extname = ".php"
      }))
      .pipe(gulp.dest('./source/tmp'))
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

gulp.task('webserver', () => {
    gulp.src('./build')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('replacePhpTag', () => {
    return gulp.src(['./source/tmp/**/*.php', '!./source/tmp/_layout/*.php'])
        .pipe(replace('<php>', '<?php '))
        .pipe(replace('<echo>', '<?= '))
        .pipe(replace(new RegExp(/<\/php>|<\/echo>/, 'g'), ' ?>'))
        .pipe(gulp.dest('./build'))
        .pipe(livereload())
})

gulp.task('watch', () => {
    livereload.listen()
    gulp.watch('./source/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('./source/views/**/*.pug', gulp.series(['pug', 'replacePhpTag']))
    gulp.watch('./source/img/**/*', gulp.parallel('imagemin'))
    gulp.watch('./source/js/scripts/**/*.js', gulp.series(['concat', 'uglify']))
});

gulp.task('default', gulp.parallel('sass', 'pug', 'imagemin', 'uglify', 'concat', 'replacePhpTag', 'watch', 'webserver'));