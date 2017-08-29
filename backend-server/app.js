var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var ejs = require('ejs');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();
var fs = require('fs');
var config = require('./config');

/* 定义变量 */
var resolve = file => path.resolve(__dirname, file);

//设置favicon.ico
// app.use(favicon(resolve('../src/assets/img/favicon.ico')))

// babel 编译
require('babel-core/register');

// // 设置 view 引擎
// app.set('views', resolve('../views'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

// 加载云代码方法
// require('./cloud');
// 
// 加载云引擎中间件
app.use(AV.express());

// 加载 cookieSession 以支持 AV.User 的会话状态
app.use(AV.Cloud.CookieSession({ secret: '05XgTktKPMkU', maxAge: 3600000, fetchUser: true }));

// 强制使用 https
app.enable('trust proxy');
// app.use(AV.Cloud.HttpsRedirect());

app.use('/static', express.static(resolve('../assets')));
app.use('/dist', express.static(resolve('../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// views is directory for all template files
app.set('views', resolve('../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

/*
 展示页路由模块
*/

// 跨域支持
app.all('/api/*', (req, res, next) => {
  const origin = req.headers.origin;
  if (config.whiteOrigins.indexOf(origin) !== -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  }
  next();
});

const apiRouter = require('./api-router');
app.use('/api', apiRouter);

// 后台管理页
app.get('/admin/*', function(req, res) {
    // var sess = req.session;
    // var loginUser = sess.loginUser;
    // var isLogined = !!loginUser;
    // if (isLogined){
    //     console.log('已登录')
    //     var html = fs.readFileSync(resolve('./' + 'admin.html'), 'utf-8');
    // }else{
    //     console.log('未登录')
    //     var html = fs.readFileSync(resolve('./' + 'login.html'), 'utf-8');
    // }
    // res.send(html);
    res.render('admin');
});

app.get('*', function(req, res) {
  res.render('index');
});

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || err,
    error: {}
  });
});
module.exports = app;
