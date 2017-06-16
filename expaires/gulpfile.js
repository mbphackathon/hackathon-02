/**
 * Gulp main file
 * Usage : gulp [task]
 * Task API : gulp.task(name[, helpMessage, deps, fn, taskOptions])
 * More at https://www.npmjs.com/package/gulp-help
 */
var gulp = require('gulp-help')(require('gulp'));

/**
 * Load all dependencies
 */
var gutil      = require('gulp-util'),
    watch      = require('gulp-watch'),
    del        = require('del'),
    concat     = require('gulp-concat'),
    sass       = require('gulp-sass'),
    merge      = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    batch      = require('gulp-batch'),
    gulpIf     = require('gulp-if'),
    ts         = require('gulp-typescript'),
    tsProject  = ts.createProject('tsconfig.json'),
    plumber    = require('gulp-plumber');

/**
 * Helper to build paths
 */
function prependPath(prependValue, array) {
    return array.map(function(value) {
        return prependValue + value;
    });
}

/**
 * Helper to dump array
 */
function dumpArray(array) {
    console.log('[');
    array.forEach(function(value){
        console.log('    ' + value);
    });
    console.log(']');
}

// Handle errors
function handleError(err) {
    gutil.log(err);
    this.emit('end');
}

/**
 * Load configuration
 */
var config = require('./config.js');

/**
 * Reload config file (for watch)
 */
gulp.task('config:reload', 'Reload configuration for watchers', [], function() {
    config = require('./config.js');
});


/**
 * Build HTML files
 * @launch html:remove
 */
gulp.task('html:build',
    'Build all HTML files (call "html:remove")',
    ['html:remove'],
    function () {
        var indexFile = prependPath(config.source_dir, config.app_files.index),
            tplFiles  = prependPath(config.source_dir, config.app_files.html),
            allFiles  = indexFile.concat(tplFiles);

        buildIndex = gulp.src(indexFile)
            .pipe(gulp.dest(config.build_dir));

        buildTpls = gulp.src(tplFiles)
            .pipe(gulp.dest(config.build_dir + 'html'));

        gutil.log(gutil.colors.yellow('Path patterns for HTML files'));
        dumpArray(allFiles);

        return merge(buildIndex, buildTpls);
    }
);

/**
 * Remove HTML files built
 */
gulp.task('html:remove',
    'Remove all HTML files built',
    function (callback) {
        return del([
            config.build_dir + config.app_files.index,
            config.build_dir + 'html/**/*'
        ], callback);
    }
);


/**
 * Create CSS file
 * @launch css:remove
 */
gulp.task('css:build',
    'Build main CSS file (call "css:remove")',
    ['css:remove'],
    function () {
        var vendorsFiles = config.vendors_files.css,
            cssFiles = prependPath(config.source_dir, config.app_files.css),
            allFiles = vendorsFiles.concat(cssFiles.concat(cssFiles));

        gutil.log(gutil.colors.yellow('Path patterns for SCSS and CSS files'));
        dumpArray(allFiles);

        return gulp.src(allFiles)
            .pipe(sourcemaps.init())
            .pipe(gulpIf('*.scss', sass({outputStyle: 'compressed'}).on('error', sass.logError)))
            .pipe(concat('index.css'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.build_dir + 'css/'));
    }
);

/**
 * Remove CSS files built
 */
gulp.task('css:remove',
    'Remove main CSS file built',
    function (callback) {
        return del([
            config.build_dir + 'css/**/*'
        ], callback);
    }
);


/**
 * Build JS files
 * @launch js:remove
 */
gulp.task('js:build',
    'Build main JS file (call "js:remove")',
    ['js:remove'],
    function () {
        var vendorsFiles = config.vendors_files.js,
            javascriptFiles = prependPath(config.source_dir, config.app_files.js),
            allFiles = vendorsFiles.concat(javascriptFiles);

        //gutil.log(gutil.colors.yellow('Path patterns for TS and JS files'));
        //dumpArray(allFiles);

        return gulp.src(allFiles)
            .pipe(sourcemaps.init())
            .pipe(plumber({ errorHandler: handleError }))
            .pipe(gulpIf('*.ts', ts(tsProject)))
            .pipe(concat('index.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.build_dir + 'js/'));
    }
);

/**
 * Remove JS files built
 */
gulp.task('js:remove',
    'Remove main JS file built',
    function (callback) {
        return del([
            config.build_dir + 'js/**/*'
        ], callback);
    }
);


/**
 * Create Fonts file
 * @launch font:remove
 */
gulp.task('font:build',
    'Build Fonts files (call "font:remove")',
    ['font:remove'],
    function () {
        var vendorsFiles = config.vendors_files.fonts,
            allFiles     = prependPath(config.source_dir, config.app_files.fonts).concat(vendorsFiles);

        gutil.log(gutil.colors.yellow('Path patterns for Fonts files'));
        dumpArray(allFiles);

        return gulp.src(allFiles)
            // .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.build_dir + 'fonts/'));
    }
);

/**
 * Remove Fonts files built
 */
gulp.task('font:remove',
    'Remove Fonts files built',
    function (callback) {
        return del([
            config.build_dir + 'fonts/**/*'
        ], callback);
    }
);


/**
 * Create Images file
 * @launch image:remove
 */
gulp.task('image:build',
    'Build Images files (call "image:remove")',
    ['image:remove'],
    function () {
        var vendorsFiles = config.vendors_files.images,
            allFiles     = prependPath(config.source_dir, config.app_files.images).concat(vendorsFiles);

        gutil.log(gutil.colors.yellow('Path patterns for Images files'));
        dumpArray(allFiles);

        return gulp.src(allFiles)
            // .pipe(sourcemaps.write('maps'))
            .pipe(gulp.dest(config.build_dir + 'img/'));
    }
);

/**
 * Remove Images files built
 */
gulp.task('image:remove',
    'Remove Images files built',
    function (callback) {
        return del([
            config.build_dir + 'img/**/*'
        ], callback);
    }
);

/**
 * Task launched by default
 */
gulp.task('default', 'Default tasks : "css:build", "js:build", "html:build", "font:build", "image:build" and then "watch"', ['css:build', 'js:build', 'html:build', 'font:build', 'image:build'], function() {
    gulp.start('watch');
});

gulp.task('build', 'Build tasks : "css:build", "js:build", "html:build", "font:build", "image:build"', ['css:build', 'js:build', 'html:build', 'font:build', 'image:build']);

gulp.task('watch', 'Watch files modifications', [], function(cb) {
    // HTML
    var indexFile = prependPath(config.source_dir, config.app_files.index),
        tplFiles  = prependPath(config.source_dir, config.app_files.html),
        allHtmlFiles  = indexFile.concat(tplFiles);
    gulp.watch(allHtmlFiles, ['html:build']);

    // CSS
    var cssVendorsFiles = config.vendors_files.css,
        cssFiles = prependPath(config.source_dir, config.app_files.css),
        cssAllFiles = cssVendorsFiles.concat(cssFiles);
    gulp.watch(cssAllFiles, ['css:build']);

    // JS
    var javascriptVendorsFiles = config.vendors_files.js,
        javascriptFiles = prependPath(config.source_dir, config.app_files.js),
        javascriptAllFiles = javascriptVendorsFiles.concat(javascriptFiles);
    gulp.watch(javascriptAllFiles, ['js:build']);

    // Images
    var allImages = prependPath(config.source_dir, config.app_files.images).concat(config.vendors_files.images);
    gulp.watch(allImages, ['image:build']);

    // CONFIG
    gulp.watch(['./config.js'], ['config:reload']);
});
