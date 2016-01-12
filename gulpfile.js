var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var minifyCss = require('gulp-minify-css');
var sourceMaps = require('gulp-sourcemaps');
var ugliy = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var handleBars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var menu = require('./menu.json');

var less = require('gulp-less');



gulp.task('templates', function() {
  var data = {
    year: new Date().getFullYear(),
    menu: menu.menuItems
  };

  var options = {
    batch: ['src/templates/partials']
  }

  return gulp.src(['src/templates/**/*.hbs','!src/templates/partials/**/*.hbs'])
  .pipe(handleBars(data, options))
  .pipe(rename(function(path){
    path.extname = '.html'
  }))
  .pipe(gulp.dest('./'));
})


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
  gulp.src(['src/styles/main.less'])
  .pipe(less())
  .pipe(sourceMaps.init())
  .pipe(minifyCss())
  .pipe(sourceMaps.write())
  .pipe(gulp.dest('dist/styles'))
  .pipe(browserSync.stream());

});

gulp.task('default',['styles','images','scripts','templates'], function(){
  browserSync.init({
    server: './'
  });
  //gulp.watch('src/**/*',browserSync.reload);
  gulp.watch('src/styles/**/*.less',['styles']);
  gulp.watch('src/scripts/**/*.js',['scripts']);
  gulp.watch('src/img/**/*',['images']);
  gulp.watch('src/templates/**/*.hbs',['templates']);

  gulp.watch('*.html',browserSync.reload);
});
