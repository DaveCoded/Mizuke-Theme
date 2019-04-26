const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

// Compile Sass & Inject Into Browser
gulp.task("sass", done => {
  gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
  done();
});

// Move JS Files to src/js
gulp.task("js", done => {
  gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
  done();
});

// Watch Sass & Serve
gulp.task(
  "serve",
  gulp.series("sass", done => {
    browserSync.init({
      server: "./src"
    });

    gulp.watch(
      ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
      gulp.series("sass")
    );
    gulp.watch("src/*.html").on("change", browserSync.reload);
    done();
  })
);

// Move Fonts Folder to src
gulp.task("fonts", done => {
  gulp.src("node_modules/font-awesome/fonts/*").pipe(gulp.dest("src/fonts"));
  done();
});

// Move Font-awesome CSS to src/css
gulp.task("fa", done => {
  gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("src/css"));
  done();
});

gulp.task("default", gulp.parallel("js", "serve", "fa", "fonts"));
