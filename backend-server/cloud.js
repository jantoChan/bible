var AV = require('leanengine');

var Punch = require('./util/Punch');
var Mailer= require('./util/Mailer');
// 云函数
AV.Cloud.define('Punch', function(res){
	TlinkTokenQuery().end(function(err, data) {
		var token= data.body.data.accessToken;
		Punch(token).end(function(punchErr, punchRes){
			console.log('准时返工啦-------------------');
			console.log(punchRes.body);
			console.log(token);
			var code = punchRes.body.data.length;
			var message = punchRes.body.message;
			if (!code){
				message= '打卡失败了 --'+message;
				//触发autoLogin,自动打卡
			}else{
				message=  '打卡成功 --'+message;
			}
			Mailer('TLink打卡', message);
		});
	})
});
