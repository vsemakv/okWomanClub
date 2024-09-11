const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const paths = {
  pug: {
    src: 'src/pug/**/*.pug',
    dest: 'dist/'
  },
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts/'
  }
};

function compilePug() {
  return gulp.src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

function copyFonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

function compileSass() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch(paths.pug.src, compilePug);
  gulp.watch(paths.styles.src, compileSass);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.fonts.src, copyFonts);
  gulp.watch(paths.images.src, copyImages);
}
function copyImages() {
    return gulp.src(paths.images.src)
      .pipe(gulp.dest(paths.images.dest));
  }
  
const build = gulp.series(
  gulp.parallel(compilePug, compileSass, scripts, copyImages, copyFonts)
);
const watch = gulp.series(build, watchFiles);

exports.compilePug = compilePug;
exports.compileSass = compileSass;
exports.scripts = scripts;
exports.copyFonts = copyFonts;
exports.watch = watch;
exports.default = build;
exports.build = build; 
exports.copyImages = copyImages;