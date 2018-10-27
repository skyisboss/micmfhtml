var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    clearnHtml  = require("gulp-cleanhtml"),
    imagemin    = require('gulp-imagemin'),
    copy        = require('gulp-contrib-copy'),
    browserSync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    reload      = browserSync.reload;

// 定义源代码的目录和编译压缩后的目录
var src  = './src', //源文件
    dist = './dist';    //编译目录


gulp.task('fileinclude',function() {
        gulp.src(src+'/html/**/*.html')
            .pipe(contentIncluder({
                includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g
            }))
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'));
    });
gulp.task('fileinclude', function() {
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    gulp.src(['src/pages/**/*.html','!src/pages/include/**.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('.'));
});


// 编译全部scss 并压缩
gulp.task('css', function(){
    gulp.src(src+'/**/*.scss')
        // Sass to CSS 的输出样式：nested 继承 compact 紧凑 expanded 展开 compressed 压缩 
        .pipe(sass({outputStyle: 'expanded'}))
        //暂不压缩.pipe(minifyCss())
        .pipe(gulp.dest(dist))
})
// 编译全部js 并压缩
gulp.task('js', function() {
  gulp.src(src+'/**/*.js')
    // .pipe(plumber())
    //.pipe(uglify())
    .pipe(gulp.dest(dist));
});
// 压缩全部html
gulp.task('html', function () {
    gulp.src('*.html')
    //.pipe(clearnHtml())
    //.pipe(gulp.dest(dist));
});



// 自动刷新
gulp.task('server', function() {
    browserSync.init({
        proxy: "127.0.0.6", // 指定代理url
        notify: false, // 刷新不弹出提示
        open: false, //停止自动打开浏览器
    });

    
    // 监听scss文件编译
    gulp.watch('src/pages/**/*.html', ['fileinclude']);

    // 监听scss文件编译
    gulp.watch(src+'/**/*.scss', ['css']);
    // 监听html文件变化后刷新页面
    gulp.watch(src+"/**/*.js", ['js']).on("change", reload);
    // 监听html文件变化后刷新页面
    gulp.watch("*.html", ['html']).on("change", reload);
    // 监听css文件变化后刷新页面
    gulp.watch(dist+"/**/*.css").on("change", reload);
});
// 监听事件
gulp.task('default', ['css', 'js',  'html','server','fileinclude'])