"use strict"

let gulp = require('gulp');
let textlint = require('gulp-textlint');
let runSequence = require('run-sequence');
var del = require('del');
let spawn = require('child_process').spawn;
let exec = require('child_process').exec;

let fs = require("fs");
let yaml = require("js-yaml");

// 初期設定
const articles = (process.env.BOOK_DIR)? process.env.BOOK_DIR : "book";       // 原稿のあるディレクトリ
const bookConfig = yaml.safeLoad(fs.readFileSync(`${articles}/config.yml`, "utf8"));

// textlint
gulp.task('textlint', function(){
  return gulp.src([`./${articles}/**/*.re`, '!node_modules/**/*', '!vendor/**/*'])
    .pipe(textlint());
});

gulp.task('watch', function(){
  gulp.watch(`./${articles}/**/*.re`, ['textlint']);
});

// Child Process の出力
let setEcho = (s) => {
  s.stdout.on('data', function (data) {
    process.stdout.write(data);
  });
  s.stderr.on('data', function (data) {
    process.stdout.write('\u001b[33m' + data + '\u001b[0m');
  });
  s.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
};


// clean
gulp.task('clean', function(){  
  return del([
					`${articles}/${bookConfig.bookname}-*/`, // pdf, epub temp dir
					`${articles}/webroot/`,
					`${articles}/*.pdf`,
					`${articles}/*.epub`,
					`${articles}/*.html`,
					`${articles}/*.md`,
					`${articles}/*.xml`,
					`${articles}/*.txt`
				]);
});

// preprocess
gulp.task('preprocess', function(){
  return exec('bundle exec review-preproc -r --tabwidth=2 *.re', { cwd: `./${articles}` } ,function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

// Output PDF
gulp.task('compile-pdf', function(){
  let task = spawn(`bundle`, ['exec', 'review-pdfmaker', 'config.yml'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('pdf', function(){
  return runSequence('clean','preprocess','compile-pdf');
});


// Output epub
gulp.task('compile-epub', function(){
  let task = spawn(`bundle`, ['exec', 'review-epubmaker', 'config.yml'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('epub', function(){
  return runSequence('clean','preprocess','compile-epub');
});

// Output TEXT
gulp.task('compile-text', function(){
  let task = spawn(`bundle`, ['exec', 'review-compile', '--target=text'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('text', function(){
  return runSequence('clean','preprocess','compile-text');
});

// Output Markdown
gulp.task('compile-markdown', function(){
  let task = spawn(`bundle`, ['exec', 'review-compile', '--target=markdown'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('markdown', function(){
  return runSequence('clean','preprocess','compile-markdown');
});

// Output HTML
gulp.task('compile-html', function(){
  let task = spawn(`bundle`, ['exec', 'review-webmaker', 'config.yml'], { cwd: `./${articles}` });
  // let task = spawn(`bundle`, ['exec', 'review-compile', '--target=html', '--stylesheet=style.css', '--chapterlink'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('html', function(){
  return runSequence('clean','preprocess','compile-html');
});

// Output LaTex
gulp.task('compile-latex', function(){
  let task = spawn(`bundle`, ['exec', 'review-compile', '--target=latex', '--footnotetext'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('latex', function(){
  return runSequence('clean','preprocess','compile-latex');
});

// Output InDesign XML
gulp.task('compile-idxml', function(){
  let task = spawn(`bundle`, ['exec', 'review-compile', '--target=idgxml'], { cwd: `./${articles}` });
  setEcho(task);
  return task;
});

gulp.task('idxml', function(){
  return runSequence('clean','preprocess','compile-idxml');
});
