var app = require('../app')
var express = require('express');
var mysql  = require('mysql');  
var crypto = require('crypto');
var user = require('../models/user');

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

    console.log("username : " + username + ", password : " + password);
    console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    console.log("Mail : " + mailAddr);
    if(username!="" && password!="" && fname!="" && lname!="" && gender!="" && date!="" && phone!="" && credit!="" && mailAddr!=""){
        user.confirmMail(mailAddr);
        user.reg(username, password, fname, lname, gender, date, phone, credit, mailAddr);
    }
    // res.redirect('/');
   
})

module.exports = router;
module.exports = app;
