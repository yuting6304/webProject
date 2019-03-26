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
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        res.render('login', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('login', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    
    console.log("Username : " + username + ", Password : " + password);

    user.memberLogin(username, password, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log("login : " + data);
            // if(data == -1){
            //     user.setloginStatus("fail");
            //     res.redirect('/login');
            // }
            // else{
            if(data == 1){
                // let modSql = 'users SET online = ? WHERE account = ?';
                // let modSqlParams = [1, account];
                // dbConnection.updateData(modSql, modSqlParams);
                
                // user.setloginStatus(data);
                // console.log(user.getloginAccount());
                
                res.locals.username = username;
                //設定session
                req.session.username = res.locals.username;
                req.session.logined = true; 
                // console.log(req.session.username);                       
                res.redirect('/');
                // res.render('index', { title: 'Logout' });
           }
           else{
                // user.setloginStatus("fail",-1);
                res.redirect('/login');
           }
        }
    });
    
    // console.log("data :\n" + DBData);

});
module.exports = router;
module.exports = app;
