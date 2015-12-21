var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var ugliy = require('gulp-uglify');
var imageMin = require('gulp-imagemin');

gulp.task('images', function(){
    gulp.src(['src/img/**/*'])
    .pipe(imageMin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());

});

gulp.task('scripts', function(){
    gulp.src(['src/scripts/main.js'])
    .pipe(sourceMaps.init())
    .pipe(ugliy())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.stream());
});


gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.css'])
  .pipe(sourceMaps.init())
  .pipe(minifyCss())
  .pipe(sourceMaps.write())
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.stream());

});

gulp.task('default', function(){
  browserSync.init({
    server: './'
  });
  //gulp.watch('src/**/*',browserSync.reload);
  gulp.watch('src/styles/**/*.css',['styles']);
  gulp.watch('src/scripts/**/*.js',['scripts']);
  gulp.watch('src/img/**/*',['images']);
  gulp.watch('*.html',browserSync.reload);
});
