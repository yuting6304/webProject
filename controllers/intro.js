var app = require('../app')
var express = require('express');
var user = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('intro', { title: 'Express' });
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        let name = user.getloginAccount();
        res.render('intro', { title: 'Log out', account: name});
    }
    else{
        res.render('intro', { title: 'Sign in', account: 'Sign up'});
    }
});

module.exports = router;
