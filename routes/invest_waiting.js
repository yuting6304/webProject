var app = require('../app')
var express = require('express');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session.logined){
        res.render('invest_waiting', { title: 'Log out', account: req.session.username});
    }
    else{
        res.render('invest_waiting', { title: 'Sign in', account: 'Sign up'});
    }
});

module.exports = router;
