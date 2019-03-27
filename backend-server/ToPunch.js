let AV = require('leanengine');

let Punch = require('./util/Punch');
let Mailer= require('./util/Mailer');
const punchAndMail= function (token) {
	Punch(token).end(function(punchErr, punchRes){
		console.log('准时返工啦-------------------');
		console.log(punchRes.body);
		var code = punchRes.body.data.length;
		var message = punchRes.body.message;
		if (!code){
			message= '打卡失败了 --'+message;
		}else{
			message=  '打卡成功 --'+message;
		}
		Mailer('TLink打卡', message);
	});
};
const ToPunch= function(){
	// 声明一个 TLinkCounter 类型
	var TLinkCounter = AV.Object.extend('TLinkCounter');

	var TlinkTokenQuery= new AV.Query('TLinkToken');
	var TLinkCounterQuery= new AV.Query('TLinkCounter');
	TlinkTokenQuery.descending('createdAt');
	TlinkTokenQuery.select(['token']);
	TLinkCounterQuery.descending('createdAt');
	var nowDate= new Date();
	var years= nowDate.getFullYear();
	var months= nowDate.getMonth()+1;
	var days= nowDate.getDate();
	var date= `${years}/${months}/${days}`;
	// 打卡时间
	var punchTimeA= new Date(`${years}/${months}/${days} 7:00`);
	var punchTimeB= new Date(`${years}/${months}/${days} 8:30`);
	var punchTimeC= new Date(`${years}/${months}/${days} 18:00`);
	var punchTimeD= new Date(`${years}/${months}/${days} 19:30`);
	var isTime= (nowDate>punchTimeA && nowDate<punchTimeB) || (nowDate>punchTimeC && nowDate<punchTimeD);

	if (isTime) {
		TLinkCounterQuery.first().then(function (counter) {
			TlinkTokenQuery.first().then(function(data) {
				var token= data.attributes.token;
				if (counter && (counter.attributes.date === date)) {
					if (counter.attributes.counter>2) return false;
					//存在数据且打卡数不超过2次更新,并打卡
					// 执行 CQL 语句实现更新一个 TLinkCounter 对象
					AV.Query.doCloudQuery(`update TLinkCounter set counter=2 where objectId="${counter.id}"`);
					punchAndMail(token);
				}else{
					//不存在新建,并打卡
					AV.Query.doCloudQuery(`insert into TLinkCounter(date) values("${years}/${months}/${days}")`);
					punchAndMail(token);
				}
			});
		})
	}
};
module.exports= ToPunch;
