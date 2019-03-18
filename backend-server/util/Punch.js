var request = require('superagent');
var Punch = function(token) {
	var params = {
		longitude: '114.39414491030686',
		latitude: '23.07759076066541',
		address: '',
		deviceId: 'e262aa1b-db6a-3ba9-85fd-e0df85d16cff',
		mucFrom: 'tclmobile'
	};

	return request.post('http://yun.tcl.com.cn/iCloud/hrjson/hrAction_check')
		.set('Cookie', 'token='+token)
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send(params);
}
module.exports = Punch;