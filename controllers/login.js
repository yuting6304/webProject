var app = require('../app')
var express = require('express');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Logout' });
});

router.post('/', function(req, res, next){
    let account = req.body.account;
    let password = req.body.password;
    
    console.log("Account : " + account + ", Password : " + password);

    user.memberLogin(account, password, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log("login : " + data);
            if(data == 1){
                let modSql = 'users SET online = ? WHERE account = ?';
                let modSqlParams = [1, account];
                dbConnection.updateData(modSql, modSqlParams);
                
                user.setloginStatus(1);
                
                res.locals.username = account;
                //設定session
                req.session.username = res.locals.username 
                console.log(req.session.username);                       
                res.redirect('/');
                // res.render('index', { title: 'Logout' });
           }
           else{
                user.setloginStatus(-1);
                res.redirect('/login');
           }
        }
    });
    
    // console.log("data :\n" + DBData);

});
module.exports = router;
module.exports = app;
