let AV = require('leanengine');

let Punch = require('./util/Punch');
let Mailer= require('./util/Mailer');
let autoLogin = require('./util/autoLogin');
// 云函数
AV.Cloud.define('Punch', function(res){
	autoLogin().end(function(err, data) {
		var token= data.body.data.accessToken;
		Punch(token).end(function(punchErr, punchRes){
			console.log('准时返工啦-------------------');
			console.log(punchRes.body);
			console.log(token);
			var code = punchRes.body.data.length;
			var message = punchRes.body.message;
			if (!code){
				message= '打卡失败了 --'+message;
			}else{
				message=  '打卡成功 --'+message;
			}
			Mailer('TLink打卡', message);
		});
	})
});
