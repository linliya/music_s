const gulp = require('gulp');
const eslint = require('gulp-eslint');
const del = require('del');

// 检查组件代码
gulp.task('lint-components', function() {
  return gulp.src([
    './src/**/*.html',
    '!./src/**/*.test.html'
  ])
    .pipe(eslint({
      extends: 'google',
      plugins: ['html'],
      rules: {
        'new-cap': 0,
        'dot-notation': ['error', {'allowPattern': '^[a-z]+(_[a-z]+)+$'}]
      },
      envs: [
        'browser'
      ],
      parserOptions: {
        ecmaVersion: 6
      }
    }))
    .pipe(eslint.format());
});

// 检查src之外的其他内容
gulp.task('lint-others', function() {
  return gulp.src([
    './index.html'
  ])
    .pipe(eslint({
      extends: 'google',
      plugins: ['html'],
      rules: {
        'new-cap': 0
      },
      envs: [
        'browser'
      ],
      parserOptions: {
        ecmaVersion: 6
      }
    }))
    .pipe(eslint.format());
});

// 检查组件的测试代码
gulp.task('lint-tests', function() {
  return gulp.src([
    './src/**/*.test.html'
  ])
    .pipe(eslint({
      extends: 'google',
      plugins: ['html'],
      rules: {
        'new-cap': 0
      },
      env: {
        browser: true,
        mocha: true
      },
      globals: [
        'Polymer',
        'assert',
        'fixture'
      ],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
      }
    }))
    .pipe(eslint.format());
});

// 检查全部代码
gulp.task('lint', ['lint-components', 'lint-tests', 'lint-others'], function() {});

// 清除文件
gulp.task('clean', function() {
  return del.sync(['build'], {
    force: true
  });
});
