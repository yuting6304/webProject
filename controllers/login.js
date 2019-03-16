var app = require('../app')
var express = require('express');
var dbConnection = require('../models/dbConnection');
var session = require('express-session');
var user = require('../models/user');

var app = express(); // 產生express application物件
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({
	    secret: "fd34s@!@dfa453f3DF#$D&W",
	    resave: true,
	    saveUninitialized: true
}));
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
            callback(err, null);
        }
        else{
           console.log("login : " + data);
           if(data == 1){
                res.locals.username = account;
                //設定session
                req.session.username = res.locals.username 
                console.log(req.session.username);                       
                res.redirect('/');
                // res.render('index', { title: 'Logout' });
           }
        }
    });
    
    // console.log("data :\n" + DBData);

});
module.exports = router;
module.exports = app;
