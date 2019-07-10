var app = require('../app')
var express = require('express');
var user = require('../models/user');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');
var crowdFund = require('../geth/call_CrowdFunding');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

let getName = "";
// let randomString = "";
// let money, rate, period, reason;

router.get('/', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        getName = req.session.username;
        res.render('loan', { title: 'Log out', account: req.session.username});
    }
    else{
        getName = "";
        res.redirect('login');
        // res.render('loan', { title: 'Sign in', account: 'Sign up'});
    }
});

router.post('/', function(req, res, next){
    let username = getName;
    // let money = req.body.money;
    // let rate = req.body.rate;
    // let period = req.body.period;
    // let reason = req.body.reason;
    // let pass_str = req.body.pass_str;
    let money = req.body['money'];
    let rate = req.body['rate'];
    let period = req.body['period'];
    let loan_type = req.body['loan_type'];
    let reason = req.body['reason'];

    console.log("username : " + username);
    console.log("money : " + money + ", rate : " + rate);
    console.log("loan type : " + loan_type);
    console.log("period : " + period + ", reason : " + reason);

    if(loan_type == "撮合"){
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
                            matchMaker.addUser('BORROWER', username, money, rate, reliable, addr);
                            setTimeout(showInfo, 10000, addr);                            
                            user.transact(username, money, rate, period, loan_type, reason, addr);
                        }
                        else{
                            console.log('select contract failed!');
                        }
                    }
                });
            }
        });
    }
    else if(loan_type == "一般"){
        deploy_contract.deploy_contract("CrowdFunding.sol", username, money, rate, period, 259200,  reason, function(addr){
            user.transact(username, money, rate, period, loan_type, reason, addr);
        });
        // deploy_contract.deploy_crowdfunding_contract(username, money, rate, period, 259200, reason, loan_type);
        console.log('完成一般貸款');
    }

    res.redirect('/');
});

function showInfo(ADDR){
    console.log("geth info : " + matchMaker.showAllInfo(ADDR));
}

module.exports = router;
module.exports = app;
