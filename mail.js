var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var credit = require('./mailsecret');

var transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      type: 'OAuth2',
      user: credit.user,
      clientId: credit.clientId,
      clientSecret: credit.clientSecret,
      refreshToken: credit.refreshToken
    }

    // auth: {
    //     type: 'OAuth2',
    //     user: 'wac33567@gmail.com',
    //     clientId: '700795934702-90gjpq9ocrkab5qlpognne35755bt7l1.apps.googleusercontent.com',
    //     clientSecret: '6NSUEb4yIiAvZZGm7HaiUqU0',
    //     refreshToken: '1/pr0j2siqwg8lZQQSvmLc5PHyW6v7QLg8BqxUTIyhN8U'
    //     // user: credit.user,
    //     // pass: credit.password
    // }
  });
  
  var mailOptions = {
    from: 'wac33567 <wac33567@gmail.com>',
    to: 'qweszxc12345@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    