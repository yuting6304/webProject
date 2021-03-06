var express = require('express');
var moment = require('moment');
var user = require('../models/user');
var crowd_fund = require('../geth/call_CrowdFunding');
var deploy_contract = require('../geth/deploy_contract');
var matchMaker = require('../geth/call_MatchMaker');
var gethUtil = require('../models/contract_util');
var return_money = require('../geth/call_ReturnMoney');
var dbConnection = require('../models/dbConnection');



var router = express.Router();
var transaction_addr;
var match_addr;
var match_reason;
var match_mode;
var return_addr;
var return_name;
var getName;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logined){
        getName = req.session.username;
        user.getUserData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log("username : " + data.username + ", mail address : " + data.Email);
                res.render('member', { title: 'Log out', account: req.session.username, username: data.username, reliability: data.reliability, mail_addr: data.Email});
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
        getName = req.session.username;
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
        getName = req.session.username;
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

router.get('/myReturn', function(req, res, next) {
    if(req.session.logined){
        getName = req.session.username;
        user.getUserReturnData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                gethUtil.getReturnAmount(req.session.username, function(err, result){
                    console.log('time : ' + result[1]);
                    console.log('amount : ' + result[0]);
                    res.render('member_return', { title: 'Log out', account: req.session.username, time: result[1], amount: result[0], data: data });
                });
            }
        })       
    }
    else{
        res.redirect('login');
        // res.render('member_loan', { title: 'Sign in', account: 'Sign up', username: '', mail_addr: ''});
    }
});


router.post('/myReturn', function(req, res, next) {
    let name = req.query.user;
    let addr = req.query.addr;
    let msg = parseInt(req.query.msg, 10);
    let rest_money = req.query.rest_money;
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');

    let rt_money = msg;

    console.log('investigator : ' + name);   
    console.log('loaner : ' + getName);   
    console.log('msg : ' + msg);
    console.log('addr : ' + addr);
    console.log('time : ' + time);
    console.log('rest_money : ' + rest_money);


    if(msg >= rest_money){
        rt_money = rest_money;
    }
    else{
        rt_money = msg;
    }

    deploy_contract.unlock_account();
    return_money.fund(getName, rt_money, addr);
    user.return_money(0, "借方", name, getName, rt_money, 0, 0, 0, "一般", 'reason', addr, addr, time);

    setTimeout(update, 7000, addr);            
    // setTimeout(showResult, 30000, addr);


});

router.post('/return_status', function(req, res, next){
    let name = req.query.user;
    let addr = req.query.addr;
    let role = req.query.role;

    console.log('name : ' + name);
    console.log('addr : ' + addr);
    console.log('role : ' + role);

    change_returninfo_status(addr);

});

router.get('/return_waiting', function(req, res, next) {
    if(req.session.logined){
        getName = req.session.username;
        res.render('return_waiting', { title: 'Log out', account: req.session.username});
    }
    else{
        res.redirect('login');
    }
});

router.get('/myMoney', function(req, res, next) {

    if(req.session.logined){
        getName = req.session.username;
        user.getOtherReturnData(req.session.username, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                gethUtil.getOtherReturnAmount(req.session.username, function(err, result){
                    console.log('time : ' + result[1]);
                    console.log('amount : ' + result[0]);
                    res.render('loaner_return', { title: 'Log out', account: req.session.username, time: result[1], amount: result[0], data: data });
                });
            }
        })       
    }
    else{
        res.redirect('login');
    }
});

router.post('/myMoney', function(req, res, next) {

    let name = req.query.user;
    let addr = req.query.addr;
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');


    console.log('investigator : ' + name);   
    console.log('loaner : ' + getName);   
    console.log('addr : ' + addr);
    console.log('time : ' + time);
});

router.get('/transact_Info', function(req, res, next) {
    if(req.session.logined){
        getName = req.session.username;
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
        getName = req.session.username;
        console.log("GET username = " + req.session.username);
        getMatchInfo(req.session.username, match_addr, match_mode, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                if(match_mode == "借款者"){
                    user.getRestMoney(req.session.username, match_addr, "撮合", function(err, rest_money){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render('matchinfo', { title: 'Log out', account: req.session.username, data: data[0], info: data[1], counter: data[data.length-1], reason: match_reason, mode: "借款者", rest_money: rest_money });
                        }
                    });
                }
                else{
                    user.getMakeMatchSucc(data[0], data[data.length-1], match_addr, function(err, rest_money){
                        if(err){
                            console.log(err);
                        }
                        else{
                            // console.log('rest_money : ' + rest_money);
                            res.render('matchinfo', { title: 'Log out', account: req.session.username, data: data[0], info: data[1], counter: data[data.length-1], reason: match_reason, mode: "貸款者", rest_money: rest_money });
                        }
                    });
                }
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
    match_mode = req.query.mode;
    console.log("POST address = " + match_addr);
    console.log("POST reason = " + match_reason);
    console.log("POST mode = " + match_mode);
});

router.get('/return_Info', function(req, res, next){
    if(req.session.logined){
        getName = req.session.username;
        showReturnMoneyInfo(return_addr, function(err, data){
            res.render('returninfo', { title: 'Log out', account: req.session.username, investigator: data[0], loaner: data[1], time: data[2] });
        });
    }
    else{
        res.render('returninfo', { title: 'Sign in', account: 'Sign up'});
    }

});

router.post('/return_Info', function(req, res, next){
    return_name = req.query.user;
    return_addr = req.query.addr;
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');


    console.log('investigator : ' + return_name);   
    console.log('loaner : ' + getName);   
    console.log('addr : ' + return_addr);
    console.log('time : ' + time);

});


router.get('/cancel_transaction', function(req, res, next){
    if(req.session.logined){
        getName = req.session.username;
        res.render('cancel_transaction', { title: 'Log out', account: req.session.username});
    }
    else{
        res.redirect('login');
    }
});

router.post('/cancel_transaction', function(req, res, next){
    let addr = req.query.addr;
    let money = req.query.money;
    let mode = req.query.mode;
    let name = getName;
    let time = req.query.time;
    let type = req.query.type;

    money = money.substr(2, money.length-2);

    console.log('name : ', name);
    console.log('addr : ' + addr);
    console.log('money : ' + money);
    console.log('mode : ' + mode);
    console.log('type : ' + type);

    console.log('time : ' + time);

    cancel_transaction(name, mode, addr, time, type);

    if(type == '一般'){
        deploy_contract.unlock_account();
        if(mode == '借款者'){
            crowd_fund.cancel_LOAN(addr);
        }
        else{
            crowd_fund.cancel_fund(name, money, addr);
            // return_money.cancel_INVEST(addr);
        }
    }
    else{
        deploy_contract.unlock_account();
        if(mode == '借款者'){
            matchMaker.cancel_makeMatch('BORROWER', name, money, addr);
        }
        else{
            matchMaker.cancel_makeMatch('INVESTOR', name, money, addr);
        }
    }

});

function cancel_transaction(name, role, addr, time, type){
    update_cancel_flag(name, role, addr, time, type);
}

function update_cancel_flag(name, role, addr, time, type){
    if(type == '一般'){
        if(role == '借款者'){
        
            user.getLoanerANDInvestigator(addr, function(err, username){
                if(err){
                    console.log(err);
                }
                else{
                    let size = username.length;
                    for(let i = 0; i < size; i++){
                        user.getUserMail(username[i], function(err, mail_addr){
                            if(err){
                                console.log(err);
                            }
                            else{
                                if(i == 0){
                                    user.cancelMail(mail_addr, '借方', '一般');
                                }
                                else{
                                    user.cancelMail(mail_addr, '貸方', '一般');
                                }
                            }
                        });
                    }

                    let modSql = 'transaction SET cancel = ? WHERE contract_addr = ? and username = ?';
                    let modSqlParams = [1, addr, name];
                    dbConnection.updateData(modSql, modSqlParams);
            
                    let modSql1 = 'rtmoney SET cancel = ? WHERE rtcontract_addr = ? and loaner = ?';
                    let modSqlParams1 = [1, addr, name];
                    dbConnection.updateData(modSql1, modSqlParams1);
            
                    let modSql2 = 'rtexpire SET cancel = ? WHERE rtcontract_addr = ? and loaner = ?';
                    let modSqlParams2 = [1, addr, name];
                    dbConnection.updateData(modSql2, modSqlParams2);
            
                    let modSql3 = 'invest SET cancel = ? WHERE contract_addr = ? and loaner = ?';
                    let modSqlParams3 = [1, addr, name];
                    dbConnection.updateData(modSql3, modSqlParams3);
                
                }
            });
    
        }
        else{
            let modSql = 'invest SET cancel = ? WHERE contract_addr = ? and time = ?';
            let modSqlParams = [1, addr, time];
            dbConnection.updateData(modSql, modSqlParams);
    
            let modSql1 = 'rtmoney SET cancel = ? WHERE rtcontract_addr = ? and investigator = ?';
            let modSqlParams1 = [1, addr, name];
            dbConnection.updateData(modSql1, modSqlParams1);
    
            let modSql2 = 'rtexpire SET cancel = ? WHERE rtcontract_addr = ? and investigator = ?';
            let modSqlParams2 = [1, addr, name];
            dbConnection.updateData(modSql2, modSqlParams2);

            user.getUserMail(name, function(err, mail_addr){
                if(err){
                    console.log(err);
                }
                else{
                    user.cancelMail(mail_addr, '貸方', '一般');
                }
            });
        }
    }
    else{
        if(role == '借款者'){
            let modSql = 'transaction SET cancel = ? WHERE contract_addr = ? and username = ?';
            let modSqlParams = [1, addr, name];
            dbConnection.updateData(modSql, modSqlParams);

            user.getUserMail(name, function(err, mail_addr){
                if(err){
                    console.log(err);
                }
                else{
                    user.cancelMail(mail_addr, '借方', '撮合');
                }
            });

        }
        else{
            let modSql = 'invest SET cancel = ? WHERE contract_addr = ? and investigator = ?';
            let modSqlParams = [1, addr, name];
            dbConnection.updateData(modSql, modSqlParams);

            user.getUserMail(name, function(err, mail_addr){
                if(err){
                    console.log(err);
                }
                else{
                    user.cancelMail(mail_addr, '貸方', '撮合');
                }
            });
        }
    }
}


function change_returninfo_status(addr){

    let rest = return_money.show_RESTAMOUNT(addr);
    let time = return_money.show_DURATION(addr).toNumber();

    console.log(return_money.getResult(addr));
    console.log("rest : " + rest);

    if(rest == 0 || time == 0){
        update(addr);
        console.log('RESULT : ' + return_money.getResult(addr));

        if(rest == 0){
            let modSql = 'rtmoney SET status = ? WHERE contract_addr = ? and role = ?';
            let modSqlParams = [0, addr, '貸方'];
            dbConnection.updateData(modSql, modSqlParams);

            let modSql1 = 'rtexpire SET succ = ? WHERE contract_addr = ?';
            let modSqlParams1 = [1, addr];
            dbConnection.updateData(modSql1, modSqlParams1);

            user.getUserfromReturn(addr, function(err, name){
                if(err){
                    console.log(err);
                }
                else{
                    let name_size = name.length;
                    for(let i = 0; i < name_size; i++){
                        user.getUserMail(name[i], function(err, mail_addr){
                            if(err){
                                console.log(err);
                            }
                            else{
                                if(i == 0){
                                    user.returnSuccMail(mail_addr, '借方', 1);
                                }
                                else{
                                    user.returnSuccMail(mail_addr, '貸方', 1);
                                }
                            }
                        })
                    }
                }
            });
        }
        else{
            let modSql = 'rtmoney SET status = ? WHERE contract_addr = ? and role = ?';
            let modSqlParams = [2, addr, '貸方'];
            dbConnection.updateData(modSql, modSqlParams);

            // user.getUserfromReturn(addr, function(err, name){
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         let name_size = name.length;
            //         for(let i = 0; i < name_size; i++){
            //             user.getUserMail(name[i], function(err, mail_addr){
            //                 if(err){
            //                     console.log(err);
            //                 }
            //                 else{
            //                     if(i == 0){
            //                         user.returnSuccMail(mail_addr, '借方', -1);
            //                     }
            //                     else{
            //                         user.returnFailMail(mail_addr, '貸方', -1);
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // });
        }
    }
}


function update(ADDR){
    return_money.upDateContract(ADDR);
    console.log("update finish");
}

function showReturnMoneyInfo(addr, callback){


    let info = [];
    let detail = [];
    let result = [];

    deploy_contract.unlock_account();
    info = return_money.getResult(addr);
    detail = return_money.show_INVESTORS(addr);


    // console.log("info : " + info);
    // console.log("info length : " + info.length);
    // console.log("detail : " + detail);    
    // console.log("detail length : " + detail.length);

    result.push(info);
    result.push(detail);

    // console.log(result[0].length);
    // console.log(result[1].length);


    // console.log(result);

    // callback(null, result);

    user.getReturnInvestigator(addr, function(err, investigator){
        if(err){
            console.log(err);
        }
        else{
            if(investigator == -1){
                console.log('no data');
            }
            else{
                let return_detail = [];

                return_detail.push(investigator);
                return_detail.push(result);

                user.getReturnLoaner(addr, function(err, loaner){
                    if(err){
                        console.log(err);
                    }
                    else{
                        return_detail.push(loaner);
                        callback(null, return_detail);
                    }
                });
            }
        }
    });
}


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

// make a match result
function getMatchInfo(username, addr, match_mode,callback){
    deploy_contract.unlock_account();
    let result_data = matchMaker.getResult(addr);
    console.log(result_data);
    console.log('username : ' + username);


    let size_x = result_data.length-1;
    console.log('x = ' + size_x);


    if(size_x > 0){
        let size_y = result_data[0].length;
        let size_z = result_data[0][0].length;


        console.log('y = ' + size_y);
        console.log('z = ' + size_z);

        let loaner = [];
        let loaner_money = 0;
        let investor = [];
        let investor_money = 0;

        let return_data = [];

        if(match_mode == "借款者"){

            let counter = [];
            counter.push(1);

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
            return_data.push(counter);

            console.log('loaner length : ' + return_data[0].length);
            console.log('investor length : ' + return_data[1].length);
            
            callback(null, return_data);
            
        }
        else{
            let loaner_name = [];
            let loaner_count = 0;
            let counter = [];
            // let last_count = 0;

            for(let x = 0; x < size_x; x++){
                if(result_data[x][1][0] == username){
                    loaner_name.push(result_data[x][0][0]);
                }
            }

            loaner_count = loaner_name.length;
            counter.push(loaner_count);

            for(let i = 0; i < loaner_count; i++){
                for(let x = 0; x < size_x; x++){
                    if(loaner_name[i] == result_data[x][0][0]){
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

                // last_count = return_data[0].length - last_count;
                counter.push(loaner.length);
            }
            
            return_data.push(counter);


            console.log(return_data);
            console.log(return_data.length);


            callback(null, return_data);

        }
    }
    else{
        console.log('callback null array');
        callback(null, [[[['', '', '', '', ''],['', '', '', '', '']]],[0]]);
    }
    

}


function update(ADDR){
    return_money.upDateContract(ADDR);
    console.log("update finish");
}

function showResult(ADDR){
   
    let rest = return_money.show_RESTAMOUNT(ADDR);
    let time = return_money.show_DURATION(ADDR).toNumber();

    console.log(return_money.getResult(ADDR));
    console.log("rest : " + rest);

    if(rest == 0 || time == 0){
        update(ADDR);
        console.log('RESULT : ' + return_money.getResult(ADDR));
        let modSql = 'rtmoney SET status = ? WHERE contract_addr = ?';
        let modSqlParams = [1, ADDR];
        dbConnection.updateData(modSql, modSqlParams);
    }
}



module.exports = router;