var app = require('../app')
var express = require('express');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);


router.get('/', function(req, res, next) {
    res.render('confirm', { title: 'Express' });
});

router.post('/', function(req, res, next){
    let Account = req.body.Account;
    let Password = req.body.Password;
    
    console.log("Account : " + Account + ", Password : " + Password);
    
    let modSql = 'users SET confirm = ? WHERE account = ?';
    let modSqlParams = [1, Account];
    dbConnection.updateData(modSql, modSqlParams);

    user.memberLogin(Account, Password, function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            console.log("login : " + data);
            if(data == 1){
                let onlinemodSql = 'users SET online = ? WHERE account = ?';
                let onlinemodSqlParams = [1, Account];
                dbConnection.updateData(onlinemodSql, onlinemodSqlParams);
                
                user.setloginStatus(1);
                
                res.locals.username = Account;
                //設定session
                req.session.username = res.locals.username 
                console.log(req.session.username);                       
                res.redirect('/');
                // res.render('index', { title: 'Logout' });
           }
           else{
                user.setloginStatus(-1);
                res.redirect('/confirm');
           }
        }
    });

    // console.log("data :\n" + DBData);
    // res.redirect('/');

});

module.exports = router;
