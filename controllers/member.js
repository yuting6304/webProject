var express = require('express');
var user = require('../models/user');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    if(user.getloginStatus()){
        res.render('member', { title: 'Log out', account: '會員中心'});
    }
    else{
        res.render('member', { title: 'Sign in', account: 'Sign up'});
    }
    // res.render('index', { title: 'Sign in' });
});
module.exports = router;