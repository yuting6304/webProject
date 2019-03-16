var app = require('../app')
var express = require('express');
var dbConnection = require('../models/dbConnection');
var user = require('../models/user');


var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next){
    let account = req.body.account;
    let password = req.body.password;
    
    console.log("Account : " + account + ", Password : " + password);

    user.memberLogin(account, password, function(err, data){
        if(err){
            callback(err, null);
        }
        else{
           console.log("login : " + data);
        }
    });
    
    // console.log("data :\n" + DBData);

});
module.exports = router;
