'use strict';
const nodemailer = require('nodemailer');
const Mailer = (subject, ct) => {
	let transporter = nodemailer.createTransport({
		// host: 'smtp.ethereal.email',
		service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
		port: 465, // SMTP 端口
		secureConnection: true, // 使用了 SSL
		auth: {
			user: 'czengtao@163.com',
			pass: 'BA5BAF2AD835CD2C',
		}
	});

	let mailOptions = {
		from: '"chanjanto" <czengtao@163.com>', // sender address
		to: '310493753@qq.com', // list of receivers
		subject: subject, // Subject line
		// 发送text或者html格式
		// text: 'Hello world?', // plain text body
		html: ct // html body
	};

// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
		// Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
	});
}
module.exports = Mailer;