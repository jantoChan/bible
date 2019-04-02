var fetch = require("node-fetch");
var HttpsProxyAgent = require('https-proxy-agent');
var { URLSearchParams } = require('url');
var Punch = require('./Punch');
var Mailer= require('./Mailer');
var autoLogin = function() {
	var params = new URLSearchParams();
	params.append('appVersion', '1.0.14');
	params.append('secretKey', 'v4.0|tUKirc3cguFi9VjFGd4U405M7SCP30ugMxqqIrjDBrg24vo2jucblhA5vbiT2ueTQaeDT5oZtM/Qa5x4xbA86NMlnKJzv78RhNGx1oVy/BS5JloIMjbdmwN6azgc74hBwskjbWzcamhev2FntleGAAnx341i0kETHwAeyLKlnS2IB4gLVxnc0hJ3cHw99AGPrLC3v6tGmFkSTWkWvSPXEhkOIll9FJmKU0UOxikjZ0yNeR57/w0wpoi2Q5GJlH8ZpdvJLe8x2l9ZWIHZfTGZ1jXvwxT+UsaGmYJMdeXTiUaDvB8eJIkWYDyk3RH4cjWDcJsjxi/zdYxqT0UfYcH3MIF9hyEaAPvgaqzPws2no+icpUC5JiN8p84H+auNzn2H1a+3drg4F1DwUsb5HCJZg+vmGOx+JRIVDng7+thzcXqw2tFEdaeEuU5ZHMyzgxgSBeLChewxBUrRY1AwRT7OUCHmixiNg5X6gijb1b85VI0LhWX5qy1CGrbq0fUW01ZPM7oflf7tSVvi9Dc58OxlL5rYSUesREZx298WygNzcJxflkWT4fETlDxO+RMBCraq2RqhVl3tf97E8zjBfEabHhAQsXpHpKgvX9NcFyY4/xcWAJ/ISdviJEJcA48iSkEuHAezbEqPj+QjNH2gYuODxBgH6wqXsdHn+Tsymm71Lek=');
	params.append('osVersion', '12.1');
	params.append('sign', '5067c7696eddf45a63515fe6a5394faf');
	var url="https://tmtapp.tcl.com/mam-api/user/autologin";
	var ip='123.56.74.221';
	var port='80';
	fetch(url, {
		method: 'POST',
		body: params,
		redirect: 'follow',  // set to `manual` to extract redirect headers, `error` to reject redirect
		timeout: 10000,      //ms
		agent: new HttpsProxyAgent("http://" + ip + ":" + port) //<==注意是 `http://`
	}).then(function (res) {
		console.log("Response Headers ============ ");
		res.headers.forEach(function(v,i,a) {
			console.log(i+" : "+v);
		});
		return res.text();
	}).then(function (res) {
		console.log("Response Body ============ ");
		var resObj= JSON.parse(res);
		var token = resObj.data.accessToken;
		Punch(token).end(function(punchErr, punchRes){
			var code = punchRes.body.data.length;
			var message = punchRes.body.message;
			if (!code){
				message= '自动登录打卡失败了 --'+message;
			}else{
				message=  '自动登录打卡成功 --'+message;
			}
			Mailer('TLink打卡', message);
		});
	});
};
module.exports = autoLogin;
