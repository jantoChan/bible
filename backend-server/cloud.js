var AV = require('leanengine');

var Punch = require('./util/Punch');

// 云函数
AV.Cloud.define('Punch', function(){
	let TlinkTokenQuery= new AV.Query('TlinkToken');
	TlinkTokenQuery.addDescending('createdAt');
	TlinkTokenQuery.first().then(async (data)=> {
		let token= data.token;
		let punchDetail = await Punch(token);
		console.log(punchDetail)
		// data 就是符合条件的第一个 AV.Object
	}, function (error) {

	});
});