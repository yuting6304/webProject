var express = require('express');
var user = require('../models/user');
var crowd_fund = require('../geth/call_CrowdFunding');
var deploy_contract = require('../geth/deploy_contract');
var matchMaker = require('../geth/call_MatchMaker');

var router = express.Router();
var transaction_addr;
var match_addr;
var match_reason;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
        user.getUserData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log("username : " + data.username + ", mail address : " + data.Email);
                res.render('member', { title: 'Log out', account: req.session.username, username: data.username, mail_addr: data.Email});
            }
        })
            
    }
    else{
        // res.render('member', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
        res.redirect('login');
    }
});


router.get('/myLoan', function(req, res, next) {
    if(req.session.logined){
        user.getUserLoanData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log(data[0].length);
                // console.log("username : " + data.username + ", mail address : " + data.Email);
                res.render('member_loan', { title: 'Log out', account: req.session.username, data: data });
            }
        })       
    }
    else{
        res.redirect('login');
        // res.render('member_loan', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
    }
});

router.get('/myInvest', function(req, res, next) {
    if(req.session.logined){
        user.getUserInvestData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log(data[0].length);
                // console.log("username : " + data.username + ", mail address : " + data.Email);
                res.render('member_invest', { title: 'Log out', account: req.session.username, data: data });
            }
        })       
    }
    else{
        res.redirect('login');
        // res.render('member_loan', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
    }
});


router.get('/transact_Info', function(req, res, next) {
    if(req.session.logined){
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
        console.log("GET address = " + transaction_addr);
        user.getAddressData(transaction_addr, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                getInfo(transaction_addr, function(err, info){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('transactinfo', { title: 'Log out', account: req.session.username, data: data, info: info});
                    }
                })
            }
        })       
        

        // res.render('transactinfo', { title: 'Log out', account: req.session.username, data: ''});
    }
    else{
        res.render('transactinfo', { title: 'Sign in', account: 'Sign up', data: data, info: ''});
    }
});

router.post('/transact_Info', function(req, res, next) {
    transaction_addr = req.query.addr;
    console.log("POST address = " + transaction_addr);

    // getInfo(addr, function(err, info){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render('transactinfo', { title: 'Log out', account: req.session.username, data: info});
    //     }
    // })
   
});


router.get('/match_Info', function(req, res, next) {
    if(req.session.logined){
    console.log("GET username = " + req.session.username);
    getMatchInfo(req.session.username, match_addr, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.render('matchinfo', { title: 'Log out', account: req.session.username, data: data[0], info: data[1], reason: match_reason });
        }
    });
    // if(user.getloginStatus() == 1){
        // let name = user.getloginAccount();
                    
        

        // res.render('transactinfo', { title: 'Log out', account: req.session.username, data: ''});
    }
    else{
        res.render('transactinfo', { title: 'Sign in', account: 'Sign up', data: "data", info: ''});
    }
});

router.post('/match_Info', function(req, res, next) {
    match_addr = req.query.addr;
    match_reason = req.query.reason;
    console.log("POST address = " + match_addr);
    console.log("POST reason = " + match_reason);

});

// formal transaction result
function getInfo(addr, callback){

    let info = [];
    let detail = [];
    let result = [];

    deploy_contract.unlock_account();
    info = crowd_fund.getResult(addr);
    detail = crowd_fund.show_INVESTORS(addr);


    console.log("info : " + info);
    console.log("info length : " + info.length);
    console.log("detail : " + detail);    
    console.log("detail length : " + detail.length);

    result.push(info);
    result.push(detail);

    console.log(result[0].length);
    console.log(result[1].length);




    callback(null, result);
}


function getMatchInfo(username, addr, callback){
    let result_data = matchMaker.getResult(addr);
    console.log(matchMaker.getResult(addr));
    console.log('username : ' + username);


    let size_x = result_data.length;
    let size_y = result_data[0].length;
    let size_z = result_data[0][0].length;


    console.log('x = ' + size_x);
    console.log('y = ' + size_y);
    console.log('z = ' + size_z);

    let loaner = [];
    let loaner_money = 0;
    let investor = [];
    let investor_money = 0;

    let return_data = [];

    for(let x = 0; x < size_x; x++){
        if(username == result_data[x][0][0]){
            loaner.push(result_data[x][0]);
            for(let z = 0; z < size_z; z++){
                if(z == 0){
                    investor.push(result_data[x][1][z]);
                }
                else if(z == 1){
                    loaner_money = result_data[x][0][1] - result_data[x][0][2];
                    if(loaner_money >= result_data[x][1][1] - result_data[x][1][2]){
                        investor.push(result_data[x][1][1]);
                    }
                    else{
                        investor_money = loaner_money;
                        investor.push(investor_money);
                    }
                }
                else{
                    investor.push(result_data[x][1][z]);
                }
            }
        }
    }
    

    console.log('loaner : ' + loaner);
    console.log('investor : ' + investor);

    return_data.push(loaner);
    return_data.push(investor);

    console.log('loaner length : ' + return_data[0].length);
    console.log('investor length : ' + return_data[1].length);

    callback(null, return_data);

}



module.exports = router;