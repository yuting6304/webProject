var app = require('../app')
var express = require('express');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);


router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        res.render('confirm', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('confirm', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    
    console.log("Username : " + username + ", Password : " + password);
    
    let modSql = 'users SET confirm = ? WHERE username = ?';
    let modSqlParams = [1, username];
    dbConnection.updateData(modSql, modSqlParams);

    user.memberLogin(username, password, function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            console.log("login : " + data);
            // if(data == -1){
            //     user.setloginStatus("fail");
            //     res.redirect('/confirm')
            // }
            // else{
            if(data == 1){
                // let onlinemodSql = 'users SET online = ? WHERE account = ?';
                // let onlinemodSqlParams = [1, Account];
                // dbConnection.updateData(onlinemodSql, onlinemodSqlParams);
                
                // user.setloginStatus(data);
                
                res.locals.username = username;
                //設定session
                req.session.username = res.locals.username 
                console.log(req.session.username);     
                req.session.logined = true; 
                  
                res.redirect('/');
                // res.render('index', { title: 'Logout' });
           }
           else{
                user.setloginStatus("fail", -1);
                res.redirect('/confirm');
           }
        }
    });

    // console.log("data :\n" + DBData);
    // res.redirect('/');

});

module.exports = router;
