var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var mysql  = require('mysql');  
var credit = require('../models/mailsecret');
var dbConnection = require('../models/dbConnection');

var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: credit.user,
        clientId: credit.clientId,
        clientSecret: credit.clientSecret,
        refreshToken: credit.refreshToken
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next){
    let account = req.body.account;
    let password = req.body.password;
    console.log("Account : " + account + ", Password : " + password);
});


router.post('/register', function(req, res, next){
    let name = req.body.name;
    let account = req.body.account;
    let password = req.body.password;

    let fname = req.body.fname;
    let lname = req.body.lname;
    let date = req.body.date;
    let phone = req.body.phone;
    let credit = req.body.credit;
    let gender = req.body.gender;

    let mailAddr = req.body.mail;

    console.log("name : " + name + ", account : " + account + ", password : " + password);
    console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    console.log("Mail : " + mailAddr);
      
      var mailOptions = {
          from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
          to: mailAddr,
          subject: 'Confirm Email from P2P_Borrowing_Platform',
          html: '<h1>Welcome</h1><p>http://127.0.0.1:8080/</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
      });

            
        var  addSql = 'INSERT INTO users(name, account, password) VALUES(?,?,?)';
        var  addSqlParams = [name, account,password];
       dbConnection.query(addSql, addSqlParams);
});














// router.post('/register1', function(req, res, next){
    // let name = req.body.name;
    // let account = req.body.account;
    // let password = req.body.password;

    // var connection = mysql.createConnection({     
    //     host     : 'localhost',       
    //     user     : 'db',              
    //     password : 'qweszxc6304',       
    //     port: '3306',                   
    //     database: 'bc_project' 
    //   }); 
       
    //   connection.connect();
       
    //   var  addSql = 'INSERT INTO users(name, account, password) VALUES(?,?,?)';
    //   var  addSqlParams = [name, account,password];
    //   //增
    //   connection.query(addSql,addSqlParams,function (err, result) {
    //           if(err){
    //            console.log('[INSERT ERROR] - ',err.message);
    //            return;
    //           }        
       
    //          console.log('--------------------------INSERT----------------------------');
    //          console.log('INSERT ID:',result);        
    //          console.log('-----------------------------------------------------------------\n\n');  
    //   });
       
    //   connection.end();


//     // console.log("Name : " + name + ", Account : " + account + ", Password : " + password);


// });

// router.post('/register2', function(req, res, next){
    // let fname = req.body.fname;
    // let lname = req.body.lname;
    // let date = req.body.date;
    // let phone = req.body.phone;
    // let credit = req.body.credit;
    // let gender = req.body.gender;
    
    // console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    
// });

// router.post('/register3', function(req, res, next){
    // let mailAddr = req.body.mail;
    // console.log("Mail : " + mailAddr);

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: credit.user,
    //         clientId: credit.clientId,
    //         clientSecret: credit.clientSecret,
    //         refreshToken: credit.refreshToken
    //     }
    //   });
      
    //   var mailOptions = {
    //       from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
    //       to: mailAddr,
    //       subject: 'Confirm Email from P2P_Borrowing_Platform',
    //       html: '<h1>Welcome</h1><p>That was easy!</p>'
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //   });
// });
    

module.exports = router;
