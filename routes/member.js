var express = require('express');
var user = require('../models/user');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    user.getTransaction(req.session.username, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            if(data == -1){
                if(req.session.logined){
                // if(user.getloginStatus() == 1){
                    // let name = user.getloginAccount();
                    res.render('member', { title: 'Log out', account: req.session.username, transaction: '0'});
                }
                else{
                    res.render('member', { title: 'Sign in', account: 'Sign up', transaction: '0'});
                }
            }
            else{
                if(req.session.logined){
                // if(user.getloginStatus() == 1){
                    // let name = user.getloginAccount();
                    res.render('member', { title: 'Log out', account: req.session.username, transaction: data});
                }
                else{
                    res.render('member', { title: 'Sign in', account: 'Sign up', transaction: data});
                }
            }
        }
    })

    // if(req.session.logined){
    // // if(user.getloginStatus() == 1){
    //     // let name = user.getloginAccount();
    //     res.render('member', { title: 'Log out', account: req.session.username});
    // }
    // else{
    //     res.render('member', { title: 'Sign in', account: 'Sign up'});
    // }
    // res.render('index', { title: 'Sign in' });
});
module.exports = router;