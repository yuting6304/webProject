var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var handlebars = require('handlebars');
var fs = require('fs');
var mysql  = require('mysql');  
var crypto = require('crypto');
var schedule = require('node-schedule');
var mailcredit = require('./mailsecret');
var dbConnection = require('./dbConnection');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');

// var status = 0;
// var acc;

// setting of nodemailer
var smtpTransport = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // secure: true,
    // port: 465,
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: mailcredit.user,
        clientId: mailcredit.clientId,
        clientSecret: mailcredit.clientSecret,
        refreshToken: mailcredit.refreshToken
    }
});

// function initUser(){
//     dbConnection.getDBData('users', function(err, data){
//         if(err){
//             console.log(err);
//         }
//         else{
//             let size = data.length;
//             let modSql = 'users SET online = ? WHERE id = ?';
//             let modSqlParams;
//             for(let i = 1; i <= size; i++){
//                 if(data[i-1].online != 0){
//                     modSqlParams = [0, i];
//                     dbConnection.updateData(modSql, modSqlParams);
//                 }
                
//             }
//             console.log("users is inited");
//         }
//     });
// }

// insert the user register data into database
// function reg(name, password, fname, lname, gender, date, phone, credit, randstr, mailAddr){
//     let  addSql = 'users(username, password, first_name, last_name, gender, birthday, phone_number, credit_card_number, random_string, Email) VALUES(?,?,?,?,?,?,?,?,?,?)';
//     let  addSqlParams = [name, password, fname, lname, gender, date, phone, credit, randstr, mailAddr];
//     dbConnection.setDBData(addSql, addSqlParams);
// }

function reg(name, password, reliability, randstr, mailAddr){
    let  addSql = 'users(username, password, reliability, random_string, Email) VALUES(?,?,?,?,?)';
    let  addSqlParams = [name, password, reliability, randstr, mailAddr];
    dbConnection.setDBData(addSql, addSqlParams);
}

function transact(name, reliability, money, rate, period, loan_type, loan_reason, addr){
    let  addSql = 'transaction(username, reliability, money, rate, period, loan_type, loan_reason, contract_addr) VALUES(?,?,?,?,?,?,?,?)';
    let  addSqlParams = [name, reliability, money, rate, period, loan_type, loan_reason, addr];
    dbConnection.setDBData(addSql, addSqlParams);
}


function invest(investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, addr){
    let  addSql = 'invest(investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, contract_addr) VALUES(?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, addr];
    dbConnection.setDBData(addSql, addSqlParams);
}

function store_contract(addr, group){
    let  addSql = 'contract(address, group_type) VALUES(?,?)';
    let  addSqlParams = [addr, group];
    dbConnection.setDBData(addSql, addSqlParams);
}

function getUserMail(username, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username){
                    if(data[i].confirm == 1){
                        callback(null, data[i].Email);
                        return;
                    }
                }
            }
            callback(null, -1);
            return;
        }
    });
}

// judge if the mail address is used
function regMail(mailAddr, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].Email == mailAddr){
                    if(data[i].confirm == 1){
                        callback(null, 1);
                        return;
                    }
                }
            }
            callback(null, -1);
            return;
        }
    });
}

function regUsername(name, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == name){
                    if(data[i].confirm == 1){
                        callback(null, 1);
                        return;
                    }
                }
            }
            callback(null, -1);
            return;
        }
    });
}

// send mail to user that tell them the mail address is used before
function reuseMail(mailAddr, opt){
    let mailOptions;
    if(opt == 0){
        mailOptions = {
            from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
            to: mailAddr,
            subject: 'Notification Email from P2P_Borrowing_Platform',
            html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>Your username had been used before, Please use another username to register again!</p><li><a href="http://127.0.0.1:8080/register">Click Here to register Your Account</a></li>'
        };
    }
    else if(opt == 1){
        mailOptions = {
            from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
            to: mailAddr,
            subject: 'Notification Email from P2P_Borrowing_Platform',
            html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>Your mail address had been used before, Please use another mail address to register again!</p><li><a href="http://127.0.0.1:8080/register">Click Here to register Your Account</a></li>'
        };
    }
    
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function readHTML(path, callback){
    fs.readFile(path, {encoding: 'utf-8'}, function(err, html) {
        if (err) {
            // throw err;
            callback(err, null);
        }
        else {
            callback(null, html);
        }
    });
}


// send a confirm mail to user to get start their account
function confirmMail(mailAddr, randstr){
    readHTML(__dirname + '/mail/mail.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            randstr: randstr
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
            to : mailAddr,
            subject : 'Confirm Email from P2P_Borrowing_Platform',
            html : htmlToSend
            // attachments:[{
            //     filename : 'mail.png',
            //     path: __dirname + '/mail/mail.png',
            //     cid : 'https://i.imgur.com/ckZHOKo.jpg'
            // },
            // {
            //     filename : 'logo.png',
            //     path: __dirname + '/mail/logo.png',
            //     cid : 'https://i.imgur.com/bGJGS9q.png'
            // }]
         };
        smtpTransport.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else{
                consol.log('Email sent: ' + info.response);
            }
        });
    });
}

function transactMail(mailAddr){
    let mailOptions = {
        from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
        to: mailAddr,
        subject: 'Transaction notification from P2P_Borrowing_Platform',
        html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>You had successful loan</p>'
    };
      
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



function memberConfirm(name, pass, token, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == name && data[i].password == crypto.createHash('md5').update(pass).digest('hex') && data[i].random_string == token){
                    callback(null, 1);
                    return;
                }
            }
            callback(null, -1);
            return;
        }
    });
}

// find if user use the correct username and password to login or not 
function memberLogin(name, pass, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let md5 = crypto.createHash('md5');
            for(let i = 0; i < size; i++){
                if(data[i].username == name && data[i].password == md5.update(pass).digest('hex')){
                    if(data[i].confirm == 1){
                        callback(null, 1);
                        return;
                    }
                }
            }
            callback(null, -1);
            return;
        }
    });
}

function getUserData(username, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].confirm == 1){
                    callback(null, data[i]);
                }
            }
        }
    });
}

function getUserLoanData(username, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let idx = 0;
            let result_data = [];
            let index = [];
            let money = [];
            let rate = [];
            let period = [];
            let reason = [];
            let type = [];
            let status = [];
            for(let i = 0; i < size; i++){
                if(data[i].username == username){
                    idx = idx+1;
                    index.push(idx);
                    money.push(data[i].money);
                    rate.push(data[i].rate);
                    period.push(data[i].period);
                    reason.push(data[i].loan_reason);
                    type.push(data[i].loan_type);
                    status.push(data[i].status);
                }
            }

            result_data.push(index);
            result_data.push(money);
            result_data.push(rate);
            result_data.push(period);
            result_data.push(reason);
            result_data.push(type);
            result_data.push(status);
            callback(null, result_data);
        }
    });
}

function getUserInvestData(username, callback){
    dbConnection.getDBData('invest', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            let idx = 0;
            let result_data = [];
            let index = [];
            let loaner = [];
            let reliability = [];
            let money = [];
            let invest_money = [];
            let invest_rate = [];
            let invest_period = [];
            let invest_reason = [];
            let invest_type = [];
            let status = [];
            let addr = [];
            for(let i = 0; i < size; i++){
                if(data[i].investigator == username){
                    idx = idx+1;
                    index.push(idx);
                    loaner.push(data[i].loaner);
                    reliability.push(data[i].reliability);
                    money.push(data[i].money);
                    invest_money.push(data[i].invest_money);
                    invest_rate.push(data[i].rate);
                    invest_period.push(data[i].period);
                    invest_reason.push(data[i].loan_reason);
                    invest_type.push(data[i].loan_type)
                    status.push(data[i].status);
                    addr.push(data[i].contract_addr);
                }
            }
            result_data.push(index);
            result_data.push(loaner);
            result_data.push(reliability);
            result_data.push(money);
            result_data.push(invest_rate);
            result_data.push(invest_period);
            result_data.push(invest_reason);
            result_data.push(invest_type);
            result_data.push(invest_money);
            result_data.push(status);
            result_data.push(addr);
            callback(null, result_data);
        }
    });
}

function getAddressData(addr, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            let result_data = [];
            let loaner = [];
            let reliability = [];
            let money = [];
            let invest_rate = [];
            let invest_period = [];
            let invest_reason = [];
            let invest_type = [];
            for(let i = 0; i < size; i++){
                if(data[i].contract_addr == addr){
                    loaner.push(data[i].username);
                    reliability.push(data[i].reliability);
                    money.push(data[i].money);
                    invest_rate.push(data[i].rate);
                    invest_period.push(data[i].period);
                    invest_reason.push(data[i].loan_reason);
                    invest_type.push(data[i].loan_type)
                }
            }
            result_data.push(loaner);
            result_data.push(reliability);
            result_data.push(money);
            result_data.push(invest_rate);
            result_data.push(invest_period);
            result_data.push(invest_reason);
            result_data.push(invest_type);
            callback(null, result_data);
        }
    });
}


function getWholeLoanData(callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            callback(null, data);   
        }
    });
}

function getNormalLoanData(callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let result_data = [];
            for(let i = 0; i < size; i++){
                if(data[i].loan_type == "一般"){
                    result_data.push(data[i]);
                }
            }
            callback(null, result_data);   
        }
    });
}


// this function is used to show in member center
function getTransaction(username, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            if(size == 0){
                callback(null, -1);
            }
            else{
                callback(null, data[0].money);
            }
        }
    });
}

function getWholeContract(callback){
    dbConnection.getDBData('contract', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            callback(null, data);
        }
    });
}

// construct a contract
function schedule_event_deploy_constract(){

    let rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    rule.hour = 20;
    rule.minute = 0;
    rule.second = 0;
    
    schedule.scheduleJob(rule, function(){
        console.log('scheduleRecurrenceRule:' + new Date());

        let contract_count = 0;
        getWholeContract(function(err, data){
            if(err){
                console.log(err);
            }
            else{
                let size = data.length;
                
                for(let i = 0; i < size; i++){
                    if(data[i].status == 1){
                        if(matchMaker == 8){
                            break;
                        }
                        matchMaker.make_a_match(data[i].address);
                        let modSql = 'contract SET status = ? WHERE address = ?';
                        let modSqlParams = [0, data[i].address];
                        dbConnection.updateData(modSql, modSqlParams);
                        contract_count++;
                    }
                }

                deploy_contract.deploy_matchmaker_contract(259200, "投資理財");
                deploy_contract.deploy_matchmaker_contract(259200, "償還債務");                
                deploy_contract.deploy_matchmaker_contract(259200, "個人家庭週轉");
                deploy_contract.deploy_matchmaker_contract(259200, "進修/教育支出");
                deploy_contract.deploy_matchmaker_contract(259200, "醫療支出");
                deploy_contract.deploy_matchmaker_contract(259200, "購買不動產");
                deploy_contract.deploy_matchmaker_contract(259200, "裝修房屋");
                deploy_contract.deploy_matchmaker_contract(259200, "其他");
            }
        });

        console.log('合約部屬完成');
    });
}

function initContract(){
    let contract_count = 0;
    getWholeContract(function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].status == 1){
                    if(matchMaker == 8){
                        break;
                    }
                    contract_count++;
                }
            }
            if(contract_count < 8){
                deploy_contract.deploy_matchmaker_contract(259200, "投資理財");
                deploy_contract.deploy_matchmaker_contract(259200, "償還債務");
                deploy_contract.deploy_matchmaker_contract(259200, "個人家庭週轉");
                deploy_contract.deploy_matchmaker_contract(259200, "進修/教育支出");
                deploy_contract.deploy_matchmaker_contract(259200, "醫療支出");
                deploy_contract.deploy_matchmaker_contract(259200, "購買不動產");
                deploy_contract.deploy_matchmaker_contract(259200, "裝修房屋");
                deploy_contract.deploy_matchmaker_contract(259200, "其他");
            }
        }
    });
    
}

// schedule function
// use for transaction at 9 every day

function schedule_event_make_a_match(){

    let rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    rule.hour = 21;
    rule.minute = 3;
    rule.second = 0;
    
    schedule.scheduleJob(rule, function(){
        console.log('scheduleRecurrenceRule:' + new Date());
        let contract_count = 0;
        getWholeContract(function(err, data){
            if(err){
                console.log(err);
            }
            else{
                let size = data.length;
                
                for(let i = 0; i < size; i++){
                    if(data[i].status == 0){
                        if(matchMaker == 8){
                            break;
                        }
                        matchMaker.make_a_match(data[i].address);
                        let modSql = 'contract SET status = ? WHERE address = ?';
                        let modSqlParams = [-1, data[i].address];
                        dbConnection.updateData(modSql, modSqlParams);
                        contract_count++;
                    }
                }
            }
        });
        if(contract_count > 8){
            console.log("there are some errors in the contract!!!");
        }
        console.log('撮合完成');
    });
}

function getUserReliable(name, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == name){
                    if(data[i].confirm == 1){
                        callback(null, data[i].reliability);
                        return;
                    }
                }
            }
            callback(null, -1);
            return;
        }
    });
}


function getContractAddr(group_type, callback){
    dbConnection.getDBData('contract', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].status == 1){
                    if(data[i].group_type == group_type){
                        console.log('找到了！！！');
                        callback(null, data[i].address);
                    }
                }
            }
        }
    });
}


function getNormalTransactionAddr(username, id, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].id == id){
                    callback(null, data[i].contract_addr);
                    return;
                }
            }
        }
    });
}

module.exports.reg = reg;
module.exports.transact = transact;
module.exports.invest = invest;
module.exports.store_contract = store_contract;
module.exports.getUserMail = getUserMail;

module.exports.regMail = regMail;
module.exports.regUsername = regUsername;
module.exports.reuseMail = reuseMail;
module.exports.confirmMail = confirmMail;
module.exports.transactMail = transactMail;
module.exports.memberLogin = memberLogin;
module.exports.memberConfirm = memberConfirm;

module.exports.getUserData = getUserData;
module.exports.getUserLoanData = getUserLoanData;
module.exports.getUserInvestData = getUserInvestData;
module.exports.getNormalLoanData = getNormalLoanData;
module.exports.getAddressData = getAddressData;

module.exports.getTransaction = getTransaction;

module.exports.getUserReliable = getUserReliable;

module.exports.initContract = initContract;
module.exports.schedule_event_make_a_match = schedule_event_make_a_match;
module.exports.schedule_event_deploy_constract = schedule_event_deploy_constract;
module.exports.getContractAddr = getContractAddr;
module.exports.getNormalTransactionAddr = getNormalTransactionAddr;
