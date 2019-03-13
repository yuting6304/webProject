var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next){
    var account = req.body.account;
    var password = req.body.password;
    console.log("Account : " + account + ", Password : " + password);
});

router.post('/register1', function(req, res, next){
    var name = req.body.name;
    var account = req.body.account;
    var password = req.body.password;
    console.log("Name : " + name + ", Account : " + account + ", Password : " + password);
});

router.post('/register2', function(req, res, next){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var date = req.body.date;
    var phone = req.body.phone;
    var credit = req.body.credit;
    var gender = req.body.gender;
    
    console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    
});

router.post('/register3', function(req, res, next){
    var mailAddr = req.body.mail;
    console.log("Mail : " + mailAddr);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'wac33567@gmail.com',
            clientId: '700795934702-90gjpq9ocrkab5qlpognne35755bt7l1.apps.googleusercontent.com',
            clientSecret: '6NSUEb4yIiAvZZGm7HaiUqU0',
            refreshToken: '1/pr0j2siqwg8lZQQSvmLc5PHyW6v7QLg8BqxUTIyhN8U'
            // user: credit.user,
            // pass: credit.password
        }
      });
      
      var mailOptions = {
          from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
          to: mailAddr,
          subject: 'Confirm Email from P2P_Borrowing_Platform',
          html: '<h1>Welcome</h1><p>That was easy!</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
      });
});
    

module.exports = router;
