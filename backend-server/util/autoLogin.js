var request = require('superagent');
var autoLogin = function() {
	var params = {
		appVersion: '1.0.14',
		osVersion: '12.1',
		secretKey: 'v4.0|iDFnvD+VwITbisWYeno81bORif9+yw1q+k67pKoxAYzy3uT0YQ4q4sN+SJs9Yg+y76VhX5RYu7cRKB7zcug3QY960tY3AXBL9RnxGQe41Yo0i+shUJGzWspfWEGJrLTnn5U2MPDx0K1Y8PKdnQGB9FuK36ChPi9J3+EYgkL5+CQSA7gkcZTtsKc0CwG4yHYnZmBishhmlz015VXwkrmtwKBALF86cNKOVU6qyCgLt2jYGgAjE85Dwxmo1yb41dzBBahEuOjMnZ5uVfwuZwJnZD7wsnm1vk/goXSf6IkJASBxYxwRQh0DItPL3fzif0qu8fAyWt6OPJ6WUjCZBvBdq0uMBXYSqb6CZ2R5Lk9MP8KTpfwmBwlBBIMgcWQ3iJOJGPe9KIKO2/C+RJ6VdiLNkmY2c70duh8L+Y3RdmkP/fPoM1ohK3SOo+FYBsRYByY8Mz0t6rAT1yBTSLDmv47iGUbC5vwjoDb3XEe8PzKVnuxdv7u7Ble9yJ2AEzmoj3t/Vwu0hlXkXXH7yBMproWtrEKPOuqOegynfftIGcYm/Xy38Yi0EOr9aKrEaUoyIAiiQY5u/s7DTwsV3IkumCFTTWNV2p/JOVK4eofSRJJNK4KlrEV1143GRuZAWZKTX49aH792Vqz+GdE51c5B8rSTPyu1Y1iIScqdE3DHWyx93hs=',
		sign: '27a0637645f4a89f8d16d6f726b931d8'
	};
	return request.post('http://tmtapp.tcl.com/mam-api/user/autologin')
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send(params);
};
module.exports = autoLogin;
