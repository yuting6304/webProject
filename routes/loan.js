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
// let randomString = "";
// let money, rate, period, reason;

router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        getName = req.session.username;
        res.render('loan', { title: 'Log out', account: req.session.username});
    }
    else{
        getName = "";
        res.redirect('login');
        // res.render('loan', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    let username = getName;
    // let money = req.body.money;
    // let rate = req.body.rate;
    // let period = req.body.period;
    // let reason = req.body.reason;
    // let pass_str = req.body.pass_str;
    let money = req.body['money'];
    let rate = req.body['rate'];
    let period = req.body['period'];
    let reason = req.body['reason'];

    console.log("username : " + username);
    console.log("money : " + money + ", rate : " + rate);
    console.log("period : " + period + ", reason : " + reason);

    user.transact(username, money, rate, period, reason);
    res.redirect('/');


    

    // if(pass_str == "" || pass_str == undefined){
    // // if(money!="" && rate!="" && period!="" && reason!="" && randomString==""){
        
    //     money = req.body.money;
    //     rate = req.body.rate;
    //     period = req.body.period;
    //     reason = req.body.reason;
    //     console.log("randstr : " + randomString);

    //     randomString = crypto.randomBytes(32).toString('base64').substr(0, 8);
    //     console.log("pass_str : " + pass_str);
    //     console.log("username : " + username);
    //     console.log("money : " + money + ", rate : " + rate);
    //     console.log("period : " + period + ", reason : " + reason);
        
    //     if(username!="" && username!=undefined){
    //         user.getUserMail(username, function(err, data){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 if(data == -1){
    //                     console.log("mail address not found");
    //                 }
    //                 else{
    //                     user.transactMail(data ,randomString);
    //                 }
    //             }
    //         });
    //     }
    // }
    // if(pass_str != "" && pass_str != undefined){
    // // if(money!="" && rate!="" && period!="" && reason!="" && pass_str!=undefined){
        
    //     console.log("randstr : " + pass_str);
    //     console.log("username : " + username);
    //     console.log("money : " + money + ", rate : " + rate);
    //     console.log("period : " + period  + ", reason : " + reason);

    //     if(pass_str == randomString){
    //         user.transact(username, money, rate, period, reason, randomString);

    //         let modSql = 'transaction SET confirm = ? WHERE username = ?';
    //         let modSqlParams = [1, username];
    //         dbConnection.updateData(modSql, modSqlParams);
    //         randomString = "";
    //     }
            
    // }
});
module.exports = router;
module.exports = app;
