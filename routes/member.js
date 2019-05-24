var express = require('express');
var user = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
            user.getUserData(req.session.username, function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    // console.log("username : " + data.username + ", mail address : " + data.Email);
                    res.render('member', { title: 'Log out', account: req.session.username, username: data.username, mail_addr: data.Email});
                }
            })
            
        }
        else{
            res.render('member', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
        }
});
module.exports = router;