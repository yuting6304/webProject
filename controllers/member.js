var express = require('express');
var user = require('../models/user');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        let name = user.getloginAccount();
        res.render('member', { title: 'Log out', account: name});
    }
    else{
        res.render('member', { title: 'Sign in', account: 'Sign up'});
    }
    // res.render('index', { title: 'Sign in' });
});
module.exports = router;