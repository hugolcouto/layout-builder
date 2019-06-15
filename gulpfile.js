const   config          = require('./config.json'),
        gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        rename          = require('gulp-rename'),
        uglify          = require('gulp-uglify-es').default,
        watch           = require('gulp-watch'),
        concat          = require('gulp-concat'),
        clean           = require('gulp-clean'),
        pug             = require('gulp-pug'),
        imagemin        = require('gulp-imagemin'),
        replace         = require('gulp-string-replace'),
        browserSync     = require('browser-sync'),
        connectPHP      = require('gulp-connect-php')

gulp.task('sass', () => {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(browserSync.stream())
});

gulp.task('clearTmpDir', () => {
    return gulp.src('./source/tmp/*')
        .pipe(clean())
})

gulp.task('pug', () => {
    return gulp.src('./source/views/**/*.pug')
      .pipe(pug({pretty: true}))
      .pipe(rename(path => {
        path.extname = config.outputPUGExtension
      }))
      .pipe(gulp.dest('./source/tmp'))
      .pipe(browserSync.stream())
});

gulp.task('concat', () => {
    return gulp.src([
            './source/js/structure/open_jquery_tag.js', 
            './source/js/scripts/**/*.js', 
            './source/js/structure/close_jquery_tag.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./source/js/compiled'))
        .pipe(browserSync.stream())
});

gulp.task('uglify', () => {
    return gulp.src('./source/js/compiled/**/*.js')
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.outputJSPath))
        .pipe(browserSync.stream())
})

gulp.task('imagemin', () => {
    gulp.src('./source/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.outputIMGPath))
        .pipe(browserSync.stream())
})

gulp.task('connectPHP', () => {
    connectPHP.server({ base: config.serverBase }, () => {
        browserSync({
            proxy: '127.0.0.1:8000',
        });
    })
})

gulp.task('replacePhpTag', () => {
    return gulp.src([
            `./source/tmp/**/*${config.outputPUGExtension}`, 
            `!./source/tmp/_layout/*${config.outputPUGExtension}`
        ])
        .pipe(replace(new RegExp(/<php>/, 'g'), '<?php '))
        .pipe(replace(new RegExp(/<echo>/, 'g'), '<?= '))
        .pipe(replace(new RegExp(/(\<php (.*)+\>)/, 'g'), '<?= "ERROR: PHP tag can\'t contain any attribute or value" ?>'))
        .pipe(replace(new RegExp(/(\<echo (.*)+\>)/, 'g'), '<?= "ERROR: PHP tag can\'t contain any attribute or value" ?>'))
        .pipe(replace(new RegExp(/<\/php>|<\/echo>/, 'g'), ' ?>'))
        .pipe(gulp.dest(config.outputPUGFile))
        .pipe(browserSync.stream())
})

gulp.task('watch', () => {
    gulp.watch('./source/scss/**/*.scss', gulp.parallel('sass')).on('change', browserSync.reload)
    gulp.watch('./source/views/**/*.pug', gulp.series(['pug', 'replacePhpTag', 'clearTmpDir'])).on('change', browserSync.reload)
    gulp.watch('./source/img/**/*', gulp.parallel('imagemin')).on('change', browserSync.reload)
    gulp.watch('./source/js/scripts/**/*.js', gulp.series(['concat', 'uglify'])).on('change', browserSync.reload)
});

gulp.task('default', gulp.parallel('sass', 'pug', 'imagemin', 'uglify', 'concat', 'replacePhpTag', 'watch', 'connectPHP'));