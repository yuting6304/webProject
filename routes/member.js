var express = require('express');
var user = require('../models/user');
var crowd_fund = require('../geth/call_CrowdFunding');
var deploy_contract = require('../geth/deploy_contract');

var router = express.Router();
var addr;

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
        console.log("GET address = " + addr);
        user.getAddressData(addr, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                getInfo(addr, function(err, info){
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
    addr = req.query.addr;
    console.log("POST address = " + addr);

    // getInfo(addr, function(err, info){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.render('transactinfo', { title: 'Log out', account: req.session.username, data: info});
    //     }
    // })
   
});


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


module.exports = router;