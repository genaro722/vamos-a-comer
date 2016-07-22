const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build', gulp.series('partials', gulp.parallel('inject', 'other'), 'build'));
gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
//gulp.task('serve', gulp.series('inject', 'partials', 'watch', 'browsersync'));
gulp.task('serve', gulp.series('inject', 'watch', 'browsersync'));
gulp.task('serve:other', gulp.series('inject', 'other', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function partials() {
//  return gulp.src(conf.path.src('app/**/*.html'))
//    .pipe(htmlmin())
//    .pipe(angularTemplatecache('templateCacheHtml.js', {
//      module: conf.ngModule,
//      root: 'app'
//    }))
//    .pipe(gulp.dest(conf.path.tmp()));
}

function watch(done) {
  gulp.watch([
    conf.path.src('index.html'),
    'bower.json'
  ], gulp.parallel('inject'));

//  Editado por Nestor para poder actualizar el html al cambiarlo
  gulp.watch(conf.path.src('app/**/*.html'), gulp.series('partials',reloadBrowserSync));
//  gulp.watch(conf.path.src('app/**/**/*.html'), gulp.series('partials',reloadBrowserSync));
  gulp.watch([
    conf.path.src('**/*.css')
  ], gulp.series('styles'));
  gulp.watch(conf.path.src('**/*.js'), gulp.series('inject'));
  done();
//  gulp.watch("*.html").on("change", reload);
}



