var app = require('../app')
var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var events = require('events');
var emitter = new events.EventEmitter();
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');


var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        res.render('register', { title: 'Log out', account: req.session.username, Reg_Msg : ''});
    }
    else{
        res.render('register', { title: 'Sign in', account: 'Sign up', Reg_Msg : ''});
    }
});

router.post('/', function(req, res){

    let username = req.body['username'];
    let password = req.body['password'];

    // let fname = req.body['fname'];
    // let lname = req.body['lname'];
    // let date = req.body['date'];
    // let phone = req.body['phone'];
    // let credit = req.body['credit'];
    // let gender = req.body['gender'];

    let md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    let mailAddr = req.body['mail'];

    let randomString;

    // if(username!="" && password!="" && fname!="" && lname!="" && gender!=undefined && date!="" && phone!="" && credit!="" && mailAddr!=""){
        // How to send message to front web ??

    user.regUsername(username, function(err, result){
        
        if(err){
            console.log(err);
        }
        else{
            if(result == 1){
                console.log("username exist");
                res.render('register', { title: 'Sign in', account: 'Sign up', Reg_Msg : '使用者名稱已存在'});
                // user.reuseMail(mailAddr, 0);
            }
            else{
                user.regMail(mailAddr, function(err, data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(data == 1){
                            console.log("mail addr exist");
                            res.render('register', { title: 'Sign in', account: 'Sign up', Reg_Msg : '信箱地址已存在'});
                            // user.reuseMail(mailAddr, 1);
                        }
                        else{
                            randomString = crypto.randomBytes(32).toString('base64').substr(0, 8);

                            console.log("randstr : " + randomString);
                            console.log("username : " + username + ", password : " + password);
                            // console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
                            console.log("Mail : " + mailAddr);
                            
                            user.confirmMail(mailAddr, randomString);
                            user.reg(username, password, randomString, mailAddr);
                            res.redirect('/');

                        }
                    }
                })
            }
        }
    })

    
        
   
})

module.exports = router;
module.exports = app;
