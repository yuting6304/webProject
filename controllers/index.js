var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next){
    var account = req.body.account;
    var password = req.body.password;
    console.log("Account : " + account + ", Password : " + password);
});

// router.post('/register1', function(req, res, next){
//     var name = req.body.name;
//     var account = req.body.account;
//     var password = req.body.password;
//     console.log("Name : " + name + ", Account : " + account + ", Password : " + password);

// });

// router.post('/register2', function(req, res, next){
//     var fname = req.body.fname;
//     // var account = req.body.account;
//     // var password = req.body.password;
//     console.log("fname : " + fname);
// });

router.post('/register3', function(req, res, next){
    var mailAddr = req.body.mail;
    console.log("Mail : " + mailAddr);
});

module.exports = router;
