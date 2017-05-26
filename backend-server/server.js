/*
  leancloud
  部署设置  
 */

'use strict';
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || 'lgXBtzt0UOB7lW1KBjRgdolv-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'szT60BVfg8Bf6I9z1vvBFOTf',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '44Vgs3dNXUYtF17NW1FocN37'
});

// 你可以使用 useMasterKey 在云引擎中开启 masterKey 权限，将会跳过 ACL 和其他权限限制。
AV.Cloud.useMasterKey();

var app = require('./app');

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


app.listen(process.env.LEANCLOUD_APP_PORT || 3003, function() {
    console.log("hreo is comming");
});
