var app = require('../app')
var express = require('express');
var mysql  = require('mysql');  
var crypto = require('crypto');
var user = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.post('/', function(req, res){
    let name = req.body.name;
    let account = req.body.account;
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

    console.log("username : " + name + ", account : " + account + ", password : " + password);
    console.log("fname : " + fname + ", lname : " + lname + ", Gender : " + gender + ", date : " + date + ", phone : " + phone + ", credit : " + credit);
    console.log("Mail : " + mailAddr);
      
    user.confirmMail(mailAddr);
    user.reg(name, account, password, fname, lname, gender, date, phone, credit, mailAddr);
    
})

module.exports = router;
