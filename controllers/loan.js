var app = require('../app')
var express = require('express');
var crypto = require('crypto');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');
var user = require('../models/user');


var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

let getName = "";

router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        getName = req.session.username;
        res.render('loan', { title: 'Log out', account: req.session.username});
    }
    else{
        getName = "";
        res.render('loan', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    let username = getName;
    let money = req.body.money;
    let rate = req.body.rate;
    let period = req.body.period;
    let credit = req.body.credit;
    let reason = req.body.reason;
    let pass_str = req.body.pass_str;


    let randomString;

    if(money!="" && rate!="" && period!="" && credit!="" && reason!=""){
        randomString = crypto.randomBytes(32).toString('base64').substr(0, 8);
        console.log("randstr : " + randomString);
        console.log("username : " + username);
        console.log("money : " + money + ", rate : " + rate);
        console.log("period : " + period + ", credit : " + credit + ", reason : " + reason);
        
        if(username!="" && username!=undefined){
            user.getUserMail(username, function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    if(data == -1){
                        console.log("mail address not found");
                    }
                    else{
                        user.transact(username, money, rate, period, credit, reason, randomString);
                        user.transactMail(data ,randomString);
                    }
                }
            });
        }
    }
    
    if(pass_str!=""){
        user.transactConfirm(username, pass_str, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                if(data == 1){
                    console.log("randstr : " + pass_str);
                    console.log("username : " + username);
                    console.log("money : " + money + ", rate : " + rate);
                    console.log("period : " + period + ", credit : " + credit + ", reason : " + reason);
                    let modSql = 'transaction SET confirm = ? WHERE username = ?';
                    let modSqlParams = [1, username];
                    dbConnection.updateData(modSql, modSqlParams);
                }
                else{
                   console.log("transaction fail");
                }
            }
        });
        
    }
});
module.exports = router;
module.exports = app;
