var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var ejs = require('ejs');
var cookieParser= require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();
var fs = require('fs');
var config = require('./config');
var history = require('connect-history-api-fallback');

/* 定义变量 */
var resolve = file => path.resolve(__dirname, file);

//设置favicon.ico
// app.use(favicon(resolve('../src/assets/img/favicon.ico')))

// babel 编译
require('babel-core/register');

// 加载云代码方法
// require('./cloud');
// 
// 加载云引擎中间件
app.use(AV.express());

// 加载 cookieSession 以支持 AV.User 的会话状态
// app.use(AV.Cloud.CookieSession({ secret: '05XgTktKPMkU', maxAge: 3600000, fetchUser: true }));

app.use(cookieParser('bibile'));
app.use(session({
    secret: 'bible', //secret的值建议使用随机字符串
    name: 'bible-login',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

// 强制使用 https
app.enable('trust proxy');
app.use(AV.Cloud.HttpsRedirect());

app.use('/static', express.static(resolve('../assets')));
app.use('/dist', express.static(resolve('../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// views is directory for all template files
// 设置 view 引擎
app.set('views', resolve('../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//支持前端 router history模式
app.use(history({
  rewrites: [
    { from: /^\/admin/, to: '/admin'},
    { from: /^\/api\/file\/list/, to: '/api/file/list'},
    { from: /^\/api\/tags\/detail.*$/, to: function(context) {
      return context.parsedUrl.path
    }},
    { from: /^\/api\/tags/, to: '/api/tags'},
    { from: /^\/api\/article\/detail.*$/, to: function(context) {
      return context.parsedUrl.path
    }},
    { from: /^\/oauth\/github\/login/, to: '/oauth/github/login' },
    { from: /^\/oauth\/github\/callback/, to: '/oauth/github/callback' },
    { from: /^\//, to: '/' }
  ]
}));

// 跨域支持
// api 接口
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

const apiRouter = require('./router/api-router');
app.use('/api', apiRouter);

const oauthRouter = require('./router/oauth-router');
app.use('/oauth', oauthRouter);

// 后台管理页
app.use('/admin', function(req, res, next) {
    // res.redirect('/admin/login');
    res.render('admin');
});

//博客首页
app.use('/', function(req, res) {
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
