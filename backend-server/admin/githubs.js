'use strict'

const cookieParser= require('cookie-parser');
const session = require('express-session');
const fetch = require('node-fetch');

const githubs={
  login: (req, res) => {
    console.log('login');
    var dataStr = (new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path = "https://github.com/login/oauth/authorize";
    path += '?client_id=' + config.client_id;
    path += '&scope=' + config.scope;
    path += '&state=' + dataStr;
    //转发到授权服务器
    res.redirect(301, path);
  },
  getToken: (req, res) => {
    if (!!req.session.user) {
      var user= req.session.user;
      console.log(user);
      res.json({
        status: 1,
        response: user,
        msg: 'get access_token successfully'
      });
    }else{
      res.json({
        status: 0,
        response: {},
        msg: 'get access_token fail'
      });
    } 
  },
  getUser: async(req, res) => {
    console.log('user');
    let user= req.session.user;
    let param= req.body;
    console.log(user, param);
    if (user.token == param.token) {
      const url = ' https://api.github.com/user?access_token=' + user.token;
      await fetch(url)
          .then(response => {
              return response.json();
          })
          .then(response => {
              res.json(response);
          })
    }else{
      let data={
        msg: 'Token expired',
        status: 0
      };
      res.status(500).json(data);  
    }
  }
}

module.exports = githubs;
