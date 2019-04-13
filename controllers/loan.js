var app = require('../app')
var express = require('express');
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
    let mail = req.body.mail;
    let password = req.body.password;

    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    if(money!="" && rate!="" && period!="" && credit!="" && reason!="" && mail!="" && mail.search(emailRule)!=-1 && password != ""){
        console.log("username : " + username);
        console.log("money : " + money + ", rate : " + rate);
        console.log("period : " + period + ", credit : " + credit + ", reason : " + reason);
        console.log("Mail : " + mail + ", password : " + password);
    }
});
module.exports = router;
module.exports = app;
