var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');


/* 定义变量 */
var resolve = file => path.resolve(__dirname, file);

app.use('/dist', express.static(resolve('./dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var identityKey = 'skey';

// app.use(session({
//     name: identityKey,
//     secret: 'chyingp',  // 用来对session id相关的cookie进行签名
//     store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//     saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
//     resave: false,  // 是否每次都重新保存会话，建议false
//     cookie: {
//         maxAge: 15 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是15分钟
//     }
// }));


// 博客首页
app.get('*', function(req, res) {
    var html = fs.readFileSync(resolve('../' + 'index.html'), 'utf-8');
    res.send(html)
});

app.listen(process.env.PORT || 3003, function() {
    console.log("hreo is comming");
});
