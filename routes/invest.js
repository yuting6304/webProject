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
        res.render('invest', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('invest', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    

});
module.exports = router;
module.exports = app;
