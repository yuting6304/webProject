var app = require('../app')
var express = require('express');
var moment = require('moment');
var user = require('../models/user');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');
var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);
let getName = "";

router.get('/', function(req, res, next) {
    if(req.session.logined){
        getName = req.session.username;
        res.render('match', { title: 'Log out', account: req.session.username});
    }
    else{
        getName = "";
        res.redirect('login');
    }
});

router.post('/', function(req, res, next){
    let username = getName;
    let invest_money = req.body['money'];
    let rate = req.body['rate'];
    let period = req.body['period'];
    let reason = req.body['reason'];
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');


    console.log("username : " + username);
    console.log("money : " + invest_money + ", rate : " + rate);
    console.log("period : " + period + ", reason : " + reason);
    console.log('time : ' + time);

    user.getUserReliable(username, function(err, reliable){
        if(err){
            console.log(err);
        }
        else{
            user.getContractAddr(reason, function(err, addr){
                if(err){
                    console.log(err);
                }
                else{
                    if(addr != '' || addr != undefined){
                        deploy_contract.unlock_account();
                        matchMaker.addUser('INVESTOR', username, invest_money, rate, reliable, addr);
                        // matchMaker.showAllInfo(addr);
                        user.invest(username, "撮合者", reliable, 0, invest_money, rate, period, "撮合", reason, addr, time);
                        setTimeout(showInfo, 10000, addr);                            
                    }
                    else{
                        console.log('select contract failed!');
                    }
                }
            });
        }
    });

    res.redirect('/');
});

function showInfo(ADDR){
    // console.log("geth info : " + matchMaker.showAllInfo(ADDR));
    matchMaker.showAllInfo(ADDR);
}


module.exports = router;
module.exports = app;
