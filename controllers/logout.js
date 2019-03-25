var app = require('../app')
var express = require('express');
var user = require('../models/user');
var dbConnection = require('../models/dbConnection');


var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);


/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('logout', { title: 'Express' });

    // user.initUser();
    user.setloginStatus("logout");

    req.session.destroy();
    res.redirect('/');
});

// router.post('/', function(req, res, next) {
//     let logout = req.body.logout;
//     let acc = user.getloginAccount();
//     console.log(acc);
//     console.log(logout);

//     if(logout == "yes"){
//         let modSql = 'users SET online = ? WHERE account = ?';
//         let modSqlParams = [0, "qweszxc6304"];
//         user.setloginStatus("qweszxc6304", 0);

//         dbConnection.updateData(modSql, modSqlParams);
//         req.session.destroy();
//         res.redirect('/');
//     }
// });

module.exports = router;
module.exports = app;
