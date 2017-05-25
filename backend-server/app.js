var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var ejs = require('ejs');
var app = express();
var fs = require('fs');

/* 定义变量 */
var resolve = file => path.resolve(__dirname, file);

// babel 编译
require('babel-core/register');

// // 设置 view 引擎
app.set('views', resolve('../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// 加载云代码方法
// require('./cloud');
// 
// 加载云引擎中间件
app.use(AV.express());

// 加载 cookieSession 以支持 AV.User 的会话状态
app.use(AV.Cloud.CookieSession({ secret: '05XgTktKPMkU', maxAge: 3600000, fetchUser: true }));

// 强制使用 https
// app.enable('trust proxy');
// app.use(AV.Cloud.HttpsRedirect());

app.use('/static', express.static(resolve('../assets')));
app.use('/dist', express.static(resolve('../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// views is directory for all template files
app.set('views', resolve('../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('*', function(req, res) {
  res.render('index');
});

/*
 展示页路由模块
*/
const apiRouter = require('./api-router');
app.get('/api', apiRouter);

// error handlers
app.use(function(err, req, res, next) { // jshint ignore:line
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if(statusCode === 500) {
    console.error(err.stack || err);
  }
  if(req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {}
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;
