var app = require('../app')
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register3', { title: 'Express' });
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wac33567@gmail.com',
    pass: 'qweszxc14789632'
  }
});

var mailOptions = {
  from: 'wac33567@gmail.com',
  to: 'qweszxc12345@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = router;
