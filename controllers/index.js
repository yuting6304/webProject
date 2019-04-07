var app = require('../app')
var express = require('express');
// var mysql  = require('mysql');  
// var credit = require('../models/mailsecret');
// var dbConnection = require('../models/dbConnection');
var user = require('../models/user');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);
var name = "";

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
        name = req.session.username;
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        res.render('index', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('index', { title: 'Sign in', account: 'Sign up'});
    }
    // res.render('index', { title: 'Sign in' });
});


// router.get('/member/:name', function(req, res, next) {
//     console.log(req.params.name);
//     if(req.session.logined){
//     // if(user.getloginStatus() == 1){
//         // let name = user.getloginAccount();
//         res.render('index', { title: 'Log out', account: req.session.username});
//     }
//     else{
//         res.render('index', { title: 'Sign in', account: 'Sign up'});
//     }
//     // res.render('index', { title: 'Sign in' });
// });

// router.post('/login', function(req, res, next){
//     let account = req.body.account;
//     let password = req.body.password;
    
//     console.log("Account : " + account + ", Password : " + password);

//     user.memberLogin(account, password, function(err, data){
//         if(err){
//             callback(err, null);
//         }
//         else{
//            console.log("login : " + data);
//            if(data == 1){
//                 res.locals.username = account;
//                 //設定session
//                 req.session.username = res.locals.username 
//                 console.log(req.session.username);                       
//                 res.redirect('/');
//                 res.render('index', { title: 'Logout' });
//            }
//            else{
//                 res.redirect('/login');
//            }
//         }
//     });
    
    
//     // res.render('index', { title: 'Logout' });

// });


// router.post('/register', function(req, res, next){
    // let name = req.body.name;
    // let account = req.body.account;
    // let password = req.body.password;

    // let fname = req.body.fname;
    // let lname = req.body.lname;
    // let date = req.body.date;
    // let phone = req.body.phone;
    // let credit = req.body.credit;
    // let gender = req.body.gender;

    // let mailAddr = req.body.mail;

    // console.log("username : " + name + ", account : " + account + ", password : " + password);
    // console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    // console.log("Mail : " + mailAddr);
      
    // user.confirmMail(mailAddr);
    // user.reg(name, account, password, fname, lname, gender, date, phone, credit, mailAddr);
    
// });














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
