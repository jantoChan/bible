let AV = require('leanengine');

let Punch = require('./util/Punch');
let Mailer= require('./util/Mailer')
// 云函数
AV.Cloud.define('Punch', function(res){
	console.log('准时返工啦-------------------')
	var TlinkTokenQuery= new AV.Query('TLinkToken');
	TlinkTokenQuery.descending('createdAt');
	TlinkTokenQuery.select(['token']);
	TlinkTokenQuery.first().then(function(data) {
		var token= data.attributes.token;
		Punch(token).end(function(punchErr, punchRes){
			var code = punchRes.body.data.length;
			var message = punchRes.message;
			console.log(punchRes)
			if (!code){
				message= '打卡失败了 --'+message;
			}else{
				message=  '打卡成功 --'+message;
			}
			Mailer('TLink打卡', message);
		});
		console.log(token);
		// data 就是符合条件的第一个 AV.Object
	}, function (error) {

	});
});