'use strict';
const AV = require('leanengine')
const Punch = require('../util/Punch');
const Token = AV.Object.extend('TLinkToken');
const pubToken= (token) =>{
	let tokenClass= new Token();
	tokenClass.set({
		'token': token,
	});
	return tokenClass.save();
};
const punchRouter= async(req, res) => {
	let param= req.body;

	try {
		//打卡
		let leanRes= await pubToken(param.token);
		let response= await Punch(param.token);
		console.log('response', response)
		if (response) {
			res.json(response);
		} else {
			throw new Error("sorry, we've got a problem ~")
		}
	} catch (error) {

	}
};


module.exports = punchRouter;