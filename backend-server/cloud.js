let AV = require('leanengine');

let Punch = require('./util/Punch');
let Mailer= require('./util/Mailer')
// 云函数
AV.Cloud.define('Punch', function(res){
	console.log('准时返工啦-------------------')
	let TlinkTokenQuery= new AV.Query('TLinkToken');
	TlinkTokenQuery.descending('createdAt');
	TlinkTokenQuery.select(['token']);
	TlinkTokenQuery.first().then(async (data)=> {
		let token= data.attributes.token;
		let punchDetail = await Punch(token);
		let code = punchDetail.body.data.length;
		let message = punchDetail.body.message;
		if (!code){
			message= `打卡失败了 --${message}`
		}else{
			message=  `打卡成功 --${message}`
		}
		res.success();
		Mailer('TLink打卡', message);
		// data 就是符合条件的第一个 AV.Object
	}, function (error) {

	});
});