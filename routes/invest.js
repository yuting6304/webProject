var app = require('../app')
var express = require('express');
var user = require('../models/user');
var crowd_fund = require('../geth/call_CrowdFunding');
var deploy_contract = require('../geth/deploy_contract');

var app = express(); // 產生express application物件
var router = express.Router();
var invest_user = "";

app.use(router);

router.get('/', function(req, res, next) {
    if(req.session.logined){
        user.getNormalLoanData(function(err, data){
            if(err){
                console.log(err);
            }
            else{
                invest_user = req.session.username;
                // console.log("username : " + req.session.username);
                res.render('invest', { title: 'Log out', account: req.session.username, data: data });
            }
        })       
    }
    else{
        invest_user = "";
        res.redirect('login');
        // res.render('member_loan', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
    }
});

router.post('/', function(req, res, next){
    let index = req.query.index;
    let loaner = req.query.user;
    let money = req.query.money;
    let rate = req.query.rate;
    let period = req.query.period;
    let reason = req.query.reason;
    let type = req.query.type;
    let status = req.query.status;
    let msg = parseInt(req.query.msg, 10);
    let store_addr;
    
    console.log('index : ' + index);
    console.log('user : ' + loaner);
    console.log('money : ' + money);
    console.log('rate : ' + rate);
    console.log('period : ' + period);
    console.log('reason : ' + reason);
    console.log('type : ' + type);
    console.log('status : ' + status);
    console.log('msg : ' + msg);

    console.log("invest username : " + invest_user);


    user.getNormalTransactionAddr(loaner, index, function(err, addr){
        if(err){
            console.log(err);
        }
        else{
            console.log(addr);
            deploy_contract.unlock_account();
            crowd_fund.fund(invest_user, msg, addr);
            user.invest(invest_user, loaner, money, rate, period, type, reason, addr);
            setTimeout(update, 10000, addr);            
            setTimeout(showResult, 20000, addr);
            setTimeout(showResult, 35000, addr);
        }
    });

    
    
    // crowd_fund.fund(invest_user, msg);
    // user.invest(name, money, rate, period, loan_type, loan_reason, addr);
    // console.log('data : ' + invest_data.user);
    // console.log('data : ' + invest_data.money);



});

function update(ADDR){
    crowd_fund.upDateContract(ADDR);
    console.log("update finish");
}

function showResult(ADDR){
    console.log(crowd_fund.getResult(ADDR));
}

module.exports = router;
module.exports = app;
