/*
 *github oauth api
 */

'use strict';
const session = require('express-session');
const cookieParser= require('cookie-parser');
const router = require('express').Router();
const fetch = require('node-fetch');
const config = require('../config');

router.use(cookieParser());
router.get('/github/login', function(req, res) {
     var dataStr = (new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;
    path += '&scope=' + config.scope;
    path += '&state=' + dataStr;
    //转发到授权服务器
    res.redirect(301, path);
});

router.get('/github/callback', async (req, res) => {
    const code = req.query.code;
    let path = 'https://github.com/login/oauth/access_token';
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    };
    console.log(params.code);
    await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        return response.text();
    })
    .then(body => {
        const args = body.split('&');
        let bodyObj= {};
        for(var i=0; i<args.length; i++) {
          let arg = args[i].split('=');
          bodyObj[arg[0]]= arg[1];
        };
        if (!bodyObj.error) {
          req.session.user={
            token: bodyObj.access_token
          };
          // res.body = bodyObj.access_token;
          console.log('token', bodyObj.access_token);
          res.cookie('access_token', bodyObj.access_token, {domain: 'bible.leanapp.cn', path: '/', secure: false, expires: new Date(Date.now() + 900000), httpOnly: false, maxAge:900000 }) ;
        }
        // res.redirect('/admin');
    })
    .catch(e => {
        console.log(e);
    })
})

module.exports = router;

