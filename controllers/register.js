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
        res.render('register', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('register', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res){

    // let username = req.body.username;
    // let password = req.body.password;

    // let fname = req.body.fname;
    // let lname = req.body.lname;
    // let date = req.body.date;
    // let phone = req.body.phone;
    // let credit = req.body.credit;
    // let gender = req.body.gender;

    // // let md5 = crypto.createHash('md5');
    // // password = md5.update(password).digest('hex');

    // let mailAddr = req.body.mail;

    

    // emitter.on("ok",function(){
    //     return res.end("注册成功");    //    向前台返回数据
    // });
    // emitter.on("false",function(){
    //     return res.end("用户名已存在");    //    向前台返回数据
    // });

    // let sql="insert into users(username, password, first_name, last_name, gender, birthday, phone_number, credit_card_number, random_string, Email) VALUES(?,?,?,?,?,?,?,?,?,?)";    //    向user这个表里写入数据
    // var sqlValue=[username,password,fname,lname,gender,date,phone, credit, "12345678", mailAddr];
    // dbConnection.connection.query(sql,sqlValue,function(err){    //    执行sql语句
    //     if(err){
    //         console.log(err.message);    //    输出数据库错误信息
    //         emitter.emit("false");    //    返回失败
    //     }
    //     emitter.emit("ok");    //    返回成功
    // });
    


    let username = req.body.username;
    let password = req.body.password;

    let fname = req.body.fname;
    let lname = req.body.lname;
    let date = req.body.date;
    let phone = req.body.phone;
    let credit = req.body.credit;
    let gender = req.body.gender;

    let md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');

    let mailAddr = req.body.mail;

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
                user.reuseMail(mailAddr, 0);
            }
            else{
                user.regMail(mailAddr, function(err, data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(data == 1){
                            console.log("mail addr exist");
                            user.reuseMail(mailAddr, 1);
                        }
                        else{
                            randomString = crypto.randomBytes(32).toString('base64').substr(0, 8);

                            console.log("randstr : " + randomString);
                            console.log("username : " + username + ", password : " + password);
                            console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
                            console.log("Mail : " + mailAddr);
                            
                            user.confirmMail(mailAddr, randomString);
                            user.reg(username, password, fname, lname, gender, date, phone, credit, randomString, mailAddr);
                        }
                    }
                })
            }
        }
    })

    
        
    // res.redirect('/');
   
})

module.exports = router;
module.exports = app;
