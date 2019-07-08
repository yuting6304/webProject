var app = require('../app')
var express = require('express');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');
var user = require('../models/user');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

router.get('/', function(req, res, next) {
    if(req.session.logined){
        user.getWholeLoanData(function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log("username : " + data.username + ", mail address : " + data.Email);
                res.render('invest', { title: 'Log out', account: req.session.username, data: data });
            }
        })       
    }
    else{
        res.redirect('login');
        // res.render('member_loan', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
    }
});

router.post('/', function(req, res, next){
    let invest_data = req.query.data;
    console.log('data : ' + invest_data);
    
    // console.log('data : ' + invest_data.user);
    // console.log('data : ' + invest_data.money);



});
module.exports = router;
module.exports = app;
