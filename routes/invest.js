var app = require('../app')
var express = require('express');
var moment = require('moment');
var dbConnection = require('../models/dbConnection');
var user = require('../models/user');
var crowd_fund = require('../geth/call_CrowdFunding');
var deploy_contract = require('../geth/deploy_contract');
var gethUtil = require('../models/contract_util');

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
                gethUtil.getCurrentAmount(function(err, result){
                    invest_user = req.session.username;
                    // gethUtil.getRestTime(function(err, time){
                        console.log('time : ' + result[1]);
                        res.render('invest', { title: 'Log out', account: req.session.username, data: data, amount: result[0], time: result[1] });
                    // });
                });
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
    let reliable = req.query.reliable;
    let money = req.query.money;
    let rate = req.query.rate;
    let period = req.query.period;
    let reason = req.query.reason;
    let type = req.query.type;
    let status = req.query.status;
    let msg = parseInt(req.query.msg, 10);
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');


    console.log('index : ' + index);
    console.log('user : ' + loaner);
    console.log('money : ' + money);
    console.log('rate : ' + rate);
    console.log('period : ' + period);
    console.log('reason : ' + reason);
    console.log('type : ' + type);
    console.log('status : ' + status);
    console.log('msg : ' + msg);
    console.log('time : ' + time);

    console.log("invest username : " + invest_user);

    user.getNormalTransactionAddr(loaner, index, function(err, addr){
        if(err){
            console.log(err);
        }
        else{
            console.log(addr);
            deploy_contract.unlock_account();

            crowd_fund.fund(invest_user, msg, addr);
            user.invest(invest_user, loaner, reliable, money, msg, rate, period, type, reason, addr, time);
            setTimeout(update, 10000, addr, res);            
            // setTimeout(showResult, 20000, addr);
            setTimeout(showResult, 30000, addr);
        }
    });

    // res.redirect('/');
    
    // crowd_fund.fund(invest_user, msg);
    // user.invest(name, money, rate, period, loan_type, loan_reason, addr);
    // console.log('data : ' + invest_data.user);
    // console.log('data : ' + invest_data.money);



});

router.get('/changeStatus', function(req, res, next) {
    res.redirect('/');
});


router.post('/changeStatus', function(req, res, next) {
    let index = req.query.index;
    let loaner = req.query.user;

    console.log('index : ' + index);
    console.log('user : ' + loaner);


    user.getNormalTransactionAddr(loaner, index, function(err, addr){
        if(err){
            console.log(err);
        }
        else{
            console.log(addr);
            deploy_contract.unlock_account();

            showResult(addr);
            
        }
    });

    res.redirect('/invest');
});





// function getRestTime(ADDR){
//     let time = -1;
//     time = crowd_fund.show_DURATION(ADDR).toNumber();
//     return time;
// }

function update(ADDR){
    crowd_fund.upDateContract(ADDR);
    console.log("update finish");
}

function showResult(ADDR){
   
    let rest = crowd_fund.show_RESTAMOUNT(ADDR);
    let time = crowd_fund.show_DURATION(ADDR).toNumber();

    console.log(crowd_fund.getResult(ADDR));
    console.log("rest : " + rest);

    if(rest == 0 || time == 0){
        update(ADDR);
        console.log('RESULT : ' + crowd_fund.getResult(ADDR));
        let modSql = 'transaction SET status = ? WHERE contract_addr = ?';
        let modSqlParams = [0, ADDR];
        dbConnection.updateData(modSql, modSqlParams);
        
        let modSql2 = 'invest SET status = ? WHERE contract_addr = ?';
        let modSqlParams2 = [0, ADDR];
        dbConnection.updateData(modSql2, modSqlParams2);
    }
}

module.exports = router;
module.exports = app;
