var app = require('../app')
var express = require('express');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

router.get('/', function(req, res, next) {
    if(req.session.logined){
        res.render('choose', { title: 'Log out', account: req.session.username});
    }
    else{
        res.redirect('login');
    }
});

router.post('/', function(req, res, next){
    
});
module.exports = router;
module.exports = app;
