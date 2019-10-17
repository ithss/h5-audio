var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean")
var imageMin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var debug = require("gulp-strip-debug");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var folder = {
    src:"src/",
    dist:"dist/"
}
var statu = process.env.NODE_ENV == 'production';
gulp.task("html",function() {
    var page = gulp.src(folder.src + "html/*")
        // .pipe(connect.reload());
        statu && page.pipe(htmlClean());
        page.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task("image",function() {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"));
})
gulp.task("css",function() {
    var page = gulp.src(folder.src + "css/*")
        // .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]));
        statu && page.pipe(cleanCss());
        page.pipe(gulp.dest(folder.dist + "css/"));
})
gulp.task("js",function() {
    var page = gulp.src(folder.src + "js/*")
        // .pipe(connect.reload());
        statu && page.pipe(debug()).pipe(uglify());
        page.pipe(gulp.dest(folder.dist + "js/"));
})
// gulp.task("server", function () { 
//     connect.server({
//         port: "8080",
//         livereload: true
//     })
//  })
// gulp.task("watch", function () {
//     gulp.watch(folder.src + "html/*", ["html"]);
//     gulp.watch(folder.src + "css/*", ["css"]);
//     gulp.watch(folder.src + "js/*", ["js"]);
// })
gulp.task("default",["html", "css", "js", "image"]);
