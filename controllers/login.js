var app = require('../app')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

// router.get('/login', function(req, res, next){
//     var account = req.body.account;
//     var password = req.body.password;
//     console.log("login login info");

//     console.log("Account : " + account + ", Password : " + password);
// });

module.exports = router;
