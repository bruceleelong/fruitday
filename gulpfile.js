//引入gulp
let gulp = require('gulp');

//task() 布置任务
//参数一:任务名称 参数二:数组,依赖任务(可选) 参数三:回调函数

//默认任务(输入指令,如果后面没有带任务名称,会默认先执行默认任务)
//默认任务,任务合并
gulp.task('default',['say','dance'],function(){//先执行任务say,再执行任务dance,最后执行任务default
	console.log('default任务完成啦');
});


//其他任务(gulp say 执行)
gulp.task('say',['dance'],function(){//任务dance执行完后才执行任务say
	console.log('say任务完成啦');
})


//其他任务(gulp dance 执行)
gulp.task('dance',function(){
	console.log('dance任务完成啦');
})


//src() 源文件路径    dest() 目标路径  pipe()管道方法

//拷贝任务,拷贝文件,拷贝sass文件夹下所有文件到css文件夹下面
gulp.task('copysass',function(){
	gulp.src('./src/sass/*.scss')
		.pipe(gulp.dest('./src/css/'));
})//要分开进行,先拷贝lib/*的文件,然后在执行命令语句拷贝lib/*/**的文件,一层一层的进行.


//任务：监听sass文件夹下的sass文件  如果有更改，就及时更替css文件夹里面的css文件
gulp.task('watchsass',function(){
	gulp.watch('./src/sass/*.scss',['copysass']);
	//watch()
	//参数一：监听文件  参数二：数组，任务名称
	//使用Ctrl+c退出监听
});



//使用插件
//布置任务：将scss编译css
let sass=require('gulp-sass');//引入sass编译插件

gulp.task('compileSass',function(){//return可以写也可以不写
	return gulp.src('./src/sass/*.scss')
				.pipe(sass({outputStyle:'compact'}))//利用sass插件把sass文件夹下的所有sass文件转为css文件
				.pipe(gulp.dest('./src/css/'));//把css文件返回到css文件夹
});

// 监听文件修改，如果有修改，则执行compileSass任务
gulp.task('watchsass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass']);
	//watch()
	//参数一：监听文件  参数二：数组，任务名称
	//使用Ctrl+c退出监听
})



//布置任务：压缩css文件
let cssmin=require('gulp-cssmin');

gulp.task('cssmin',function(){
	return gulp.src('src/css/index2.css')
			   .pipe(cssmin())
			   .pipe(gulp.dest('dest'));
});

//布置任务：重命名
var rename=require('gulp-rename');
gulp.task('cssrename',function(){
	return gulp.src('src/css/index2.css')
			   .pipe(cssmin())
			   .pipe(rename('index2.min.css'))
			   .pipe(gulp.dest('dest'));
});


//布置任务：压缩js
let jsmin=require('gulp-uglify');

gulp.task('jsmin',function(){
	return gulp.src('src/js/classify.js')
			   .pipe(jsmin())
			   .pipe(rename('classify.min.js'))
			   .pipe(gulp.dest('dest'));
});




//压缩图片

var imagemin=require('gulp-imagemin');

gulp.task('imagemin',function(){
	return gulp.src('image/*')
			   .pipe(imagemin())
			   .pipe(gulp.dest('imgmin'));
});





//合并文件

var concat=require('gulp-concat');

gulp.task('concat',function(){
	return gulp.src(['src/*.js','lib/*.js'])
			   .pipe(concat('all.js'))
			   .pipe(gulp.dest('dest'));
});