var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var handlebars = require('handlebars');
var moment = require('moment');
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

function transact(name, reliability, money, rest_money, rate, period, loan_type, loan_reason, addr, time){
    let  addSql = 'transaction(username, reliability, money, rest_money, rate, period, loan_type, loan_reason, contract_addr, time) VALUES(?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [name, reliability, money, rest_money, rate, period, loan_type, loan_reason, addr, time];
    dbConnection.setDBData(addSql, addSqlParams);
}


function invest(investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, addr, time){
    let  addSql = 'invest(investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, contract_addr, time) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [investigator, loaner, reliability, money, invest_money, rate, period, loan_type, loan_reason, addr, time];
    dbConnection.setDBData(addSql, addSqlParams);
}

function store_contract(addr, group, time){
    let  addSql = 'contract(address, group_type, time) VALUES(?,?,?)';
    let  addSqlParams = [addr, group, time];
    dbConnection.setDBData(addSql, addSqlParams);
}

function return_money(rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, time){
    let  addSql = 'rtmoney(rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, time];
    dbConnection.setDBData(addSql, addSqlParams);
}

function return_money_status(rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, status, time){
    let  addSql = 'rtmoney(rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, status, time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [rtID, role, investigator, loaner, money, rest_money, rate, period, loan_type, loan_reason, rtcontract_addr, contract_addr, status, time];
    dbConnection.setDBData(addSql, addSqlParams);
}

function return_money_expire(investigator, loaner, year, month, day, rtcontract_addr, contract_addr){
    let  addSql = 'rtexpire(investigator, loaner, year, month, day, rtcontract_addr, contract_addr) VALUES(?,?,?,?,?,?,?)';
    let  addSqlParams = [investigator, loaner, year, month, day, rtcontract_addr, contract_addr];
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
    readHTML(__dirname + '/mail/register_mail.html', function(err, html) {
        let template = handlebars.compile(html);
        let replacements = {
            randstr: randstr
        };
        let htmlToSend = template(replacements);
        let mailOptions = {
            from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
            to : mailAddr,
            subject : 'Confirm Email from P2P_Borrowing_Platform',
            html : htmlToSend
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

function transactMail(mailAddr, opt){
    readHTML(__dirname + '/mail/transaction_mail.html', function(err, html) {
        // var template = handlebars.compile(html);
        
        if(opt == '借方'){
            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Loan success from P2P_Borrowing_Platform',
                html : html
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
        else if(opt == '貸方'){
            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Invest success from P2P_Borrowing_Platform',
                html : html
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
    });
}

function matchMail(mailAddr){
    readHTML(__dirname + '/mail/match_mail.html', function(err, html) {
        // var template = handlebars.compile(html);
        
        
        let mailOptions = {
            from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
            to : mailAddr,
            subject : 'Make a Match finished from P2P_Borrowing_Platform',
            html : html
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

function returnSuccMail(mailAddr, opt, succ){
    readHTML(__dirname + '/mail/returnSucc_mail.html', function(err, html) {
        let template = handlebars.compile(html);
        
        if(opt == '借方'){
            if(succ == 1){
                var replacements = {
                    succ_str: '您的還錢已完成，請到會員中心查看完整紀錄'
                };
            }
            else{
                var replacements = {
                    succ_str: '您的還錢未完成，請到會員中心查看完整紀錄'
                };
            }
            
            let htmlToSend = template(replacements);

            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return money success from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
        else if(opt == '貸方'){
            if(succ == 1){
                var replacements = {
                    succ_str: '他人還錢已完成，請到會員中心查看完整紀錄'
                };
            }
            else{
                var replacements = {
                    succ_str: '他人還錢未完成,請跟徵信中心聯絡走法律途徑</br><a href="https://www.jcic.org.tw/main_ch/index.aspx" style="margin: 3px; width: 80px;    display: inline-block; color: white; background-color: #ADADAD; text-decoration: none; text-align: center; padding: 2.5% 8%; border-radius: 2px;">前往徵信中心</a>'
                };
            }
            
            let htmlToSend = template(replacements);

            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return money success from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
    });
}

function returnFailMail(mailAddr, opt, succ){
    readHTML(__dirname + '/mail/returnFail_mail.html', function(err, html) {
        let template = handlebars.compile(html);
        
        if(opt == '借方'){
            if(succ == 1){
                var replacements = {
                    succ_str: '您的還錢已完成，請到會員中心查看完整紀錄'
                };
            }
            else{
                var replacements = {
                    succ_str: '您的還錢未完成，請到會員中心查看完整紀錄'
                };
            }
            
            let htmlToSend = template(replacements);

            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return money fail from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
        else if(opt == '貸方'){
            if(succ == 1){
                var replacements = {
                    succ_str: '他人還錢已完成，請到會員中心查看完整紀錄'
                };
            }
            else{
                var replacements = {
                    succ_str: '他人還錢未完成,請跟徵信中心聯絡走法律途徑'
                };
            }
            let htmlToSend = template(replacements);

            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return money fail from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
    });
}


function returnRemiderMail(mailAddr, name, opt){
    readHTML(__dirname + '/mail/return_remindMail.html', function(err, html) {
        let template = handlebars.compile(html);
        
        if(opt == '借方'){

            let replacements = {
                remind_str: '您還有未還清的借款，貸款人: ' + name + '，將在三天之內到期，請盡速還清剩餘借款金額'
            };
            let htmlToSend = template(replacements);

            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return reminder from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
        else if(opt == '貸方'){

            let replacements = {
                remind_str: name + '還有未還清的借款，將在三天之內到期'
            };
            let htmlToSend = template(replacements);
            
            let mailOptions = {
                from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                to : mailAddr,
                subject : 'Return reminder from P2P_Borrowing_Platform',
                html : htmlToSend
            };

            smtpTransport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else{
                    consol.log('Email sent: ' + info.response);
                }
            });

        }
    });
}

function cancelMail(mailAddr, opt, type){
    readHTML(__dirname + '/mail/cancel_mail.html', function(err, html) {
        let template = handlebars.compile(html);
        if(type == '一般'){
            if(opt == '借方'){

                let replacements = {
                    msg: '您的一般借款'
                };
                let htmlToSend = template(replacements);
    
                let mailOptions = {
                    from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                    to : mailAddr,
                    subject : 'Transaction cancel from P2P_Borrowing_Platform',
                    html : htmlToSend
                };
    
                smtpTransport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        consol.log('Email sent: ' + info.response);
                    }
                });
    
            }
            else if(opt == '貸方'){
    
                let replacements = {
                    msg: '您的一般投資'
                };
                let htmlToSend = template(replacements);
                
                let mailOptions = {
                    from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                    to : mailAddr,
                    subject : 'Transaction cancel from P2P_Borrowing_Platform',
                    html : htmlToSend
                };
    
                smtpTransport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        consol.log('Email sent: ' + info.response);
                    }
                });
            }
        }
        else{
            if(opt == '借方'){

                let replacements = {
                    msg: '您的撮合借款'
                };
                let htmlToSend = template(replacements);
    
                let mailOptions = {
                    from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                    to : mailAddr,
                    subject : 'Transaction cancel from P2P_Borrowing_Platform',
                    html : htmlToSend
                };
    
                smtpTransport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        consol.log('Email sent: ' + info.response);
                    }
                });
    
            }
            else if(opt == '貸方'){
    
                let replacements = {
                    msg: '您的撮合投資'
                };
                let htmlToSend = template(replacements);
                
                let mailOptions = {
                    from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
                    to : mailAddr,
                    subject : 'Transaction cancel from P2P_Borrowing_Platform',
                    html : htmlToSend
                };
    
                smtpTransport.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    }
                    else{
                        consol.log('Email sent: ' + info.response);
                    }
                });
    
            }
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
            let addr = [];
            let time = [];
            let rest_money = [];
            let cancel = [];
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
                    addr.push(data[i].contract_addr);
                    time.push(data[i].time);
                    rest_money.push(data[i].rest_money);
                    cancel.push(data[i].cancel);
                }
            }

            result_data.push(index);
            result_data.push(money);
            result_data.push(rate);
            result_data.push(period);
            result_data.push(reason);
            result_data.push(type);
            result_data.push(time);
            result_data.push(status);
            result_data.push(addr);
            result_data.push(rest_money);
            result_data.push(cancel);
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
            let time = [];
            let cancel = [];
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
                    time.push(data[i].time);
                    addr.push(data[i].contract_addr);
                    cancel.push(data[i].cancel);
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
            result_data.push(time);
            result_data.push(status);
            result_data.push(addr);
            result_data.push(cancel);
            callback(null, result_data);
        }
    });
}

function getUserReturnData(username, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            let idx = 0;
            let result_data = [];
            let index = [];
            let investigator = [];
            let money = [];
            let loan_rate = [];
            let loan_period = [];
            let loan_reason = [];
            let loan_type = [];
            let status = [];
            let addr = [];
            let time = [];
            for(let i = 0; i < size; i++){
                if(data[i].loaner == username && data[i].role == "貸方" && data[i].status != -1 && data[i].cancel == -1){
                    idx = idx+1;
                    index.push(idx);
                    investigator.push(data[i].investigator);
                    money.push(data[i].money);
                    loan_rate.push(data[i].rate);
                    loan_period.push(data[i].period);
                    loan_reason.push(data[i].loan_reason);
                    loan_type.push(data[i].loan_type)
                    status.push(data[i].status);
                    time.push(data[i].time);
                    addr.push(data[i].contract_addr);
                }
            }
            result_data.push(index);
            result_data.push(investigator);
            result_data.push(money);
            result_data.push(loan_rate);
            result_data.push(loan_period);
            result_data.push(loan_reason);
            result_data.push(loan_type);
            result_data.push(time);
            result_data.push(status);
            result_data.push(addr);
            callback(null, result_data);
        }
    });
}

function getOtherReturnData(username, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            let idx = 0;
            let result_data = [];
            let index = [];
            let loaner = [];
            let money = [];
            let loan_rate = [];
            let loan_period = [];
            let loan_reason = [];
            let loan_type = [];
            let status = [];
            let addr = [];
            let time = [];
            for(let i = 0; i < size; i++){
                if(data[i].investigator == username && data[i].role == "貸方" && data[i].status != -1){
                    idx = idx+1;
                    index.push(idx);
                    loaner.push(data[i].loaner);
                    money.push(data[i].money);
                    loan_rate.push(data[i].rate);
                    loan_period.push(data[i].period);
                    loan_reason.push(data[i].loan_reason);
                    loan_type.push(data[i].loan_type)
                    status.push(data[i].status);
                    time.push(data[i].time);
                    addr.push(data[i].contract_addr);
                }
            }
            result_data.push(index);
            result_data.push(loaner);
            result_data.push(money);
            result_data.push(loan_rate);
            result_data.push(loan_period);
            result_data.push(loan_reason);
            result_data.push(loan_type);
            result_data.push(time);
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
            let min_money = [];
            for(let i = 0; i < size; i++){
                if(data[i].contract_addr == addr){
                    loaner.push(data[i].username);
                    reliability.push(data[i].reliability);
                    money.push(data[i].money);
                    invest_rate.push(data[i].rate);
                    invest_period.push(data[i].period);
                    invest_reason.push(data[i].loan_reason);
                    invest_type.push(data[i].loan_type);
                    min_money.push(data[i].rest_money);
                }
            }
            result_data.push(loaner);
            result_data.push(reliability);
            result_data.push(money);
            result_data.push(invest_rate);
            result_data.push(invest_period);
            result_data.push(invest_reason);
            result_data.push(invest_type);
            result_data.push(min_money);
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
                if(data[i].loan_type == "一般" && data[i].status == 1 && data[i].cancel == -1){
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
    
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    let rule = new schedule.RecurrenceRule();
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    rule.hour = 22;
    rule.minute = 56;
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
                        let modSql = 'contract SET status = ? WHERE address = ?';
                        let modSqlParams = [0, data[i].address];
                        dbConnection.updateData(modSql, modSqlParams);
                        contract_count++;
                    }
                }
                deploy_contract.unlock_account();
                deploy_contract.deploy_matchmaker_contract(259200, "投資理財", time);
                deploy_contract.deploy_matchmaker_contract(259200, "償還債務", time);                
                deploy_contract.deploy_matchmaker_contract(259200, "個人家庭週轉", time);
                deploy_contract.deploy_matchmaker_contract(259200, "進修/教育支出", time);
                deploy_contract.deploy_matchmaker_contract(259200, "醫療支出", time);
                deploy_contract.deploy_matchmaker_contract(259200, "購買不動產", time);
                deploy_contract.deploy_matchmaker_contract(259200, "裝修房屋", time);
                deploy_contract.deploy_matchmaker_contract(259200, "其他", time);
            }
        });

        console.log('合約部屬完成');
    });
}

function initContract(){
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
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
                deploy_contract.deploy_matchmaker_contract(259200, "投資理財", time);
                deploy_contract.deploy_matchmaker_contract(259200, "償還債務", time);
                deploy_contract.deploy_matchmaker_contract(259200, "個人家庭週轉", time);
                deploy_contract.deploy_matchmaker_contract(259200, "進修/教育支出", time);
                deploy_contract.deploy_matchmaker_contract(259200, "醫療支出", time);
                deploy_contract.deploy_matchmaker_contract(259200, "購買不動產", time);
                deploy_contract.deploy_matchmaker_contract(259200, "裝修房屋", time);
                deploy_contract.deploy_matchmaker_contract(259200, "其他", time);
            }
        }
    });
    
}

// schedule function
// use for transaction at 9 every day

function schedule_event_make_a_match(){

    let rule = new schedule.RecurrenceRule();
    let delay_time = 30000;
    let status_time = 150000;
    // rule.dayOfWeek = 2;
    // rule.month = 3;
    // rule.dayOfMonth = 1;
    rule.hour = 22;
    rule.minute = 57;
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
                deploy_contract.unlock_account();
                for(let i = 0; i < size; i++){
                    if(data[i].status == 0){
                        if(matchMaker == 8){
                            break;
                        }

                        console.log(data[i].group_type + ": " + data[i].address);
                        matchMaker.make_a_match(data[i].address);
                        setTimeout(updateContractStatus, 20000, data[i].address);
                        setTimeout(addResultInDB, delay_time, data[i].address, data[i].group_type);
                        delay_time += 10000;
                        setTimeout(update_rtstatus, status_time, data[i].address);
                        status_time += 2000;
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

function updateContractStatus(addr){
    let modSql = 'contract SET status = ? WHERE address = ?';
    let modSqlParams = [-1, addr];
    dbConnection.updateData(modSql, modSqlParams);

    let modSql1 = 'invest SET status = ? WHERE contract_addr = ? and loan_type = ?';
    let modSqlParams1 = [0, addr, "撮合"];
    dbConnection.updateData(modSql1, modSqlParams1);

    let modSql2 = 'transaction SET status = ? WHERE contract_addr = ? and loan_type = ?';
    let modSqlParams2 = [0, addr, "撮合"];
    dbConnection.updateData(modSql2, modSqlParams2);
}

function showInfo(addr){
    deploy_contract.unlock_account();
    matchMaker.showAllInfo(addr);
}
function showResult(addr){
    deploy_contract.unlock_account();
    matchMaker.getResult(addr);
}

function addResultInDB(addr, reason){
    deploy_contract.unlock_account();
    let result_data = matchMaker.getResult(addr);
    console.log('reason : ' + reason);
    console.log(result_data);


    let size_x = result_data.length-1;
    console.log('x = ' + size_x);


    if(size_x > 0){

        for(let i = 0; i < size_x; i++){

            let time = moment().format('MMMM Do YYYY, h:mm:ss a');
            let loaner = result_data[i][0][0];
            let investigator = result_data[i][1][0];
            let loaner_restMoney = result_data[i][0][1]-result_data[i][0][2];
            let investigator_restMoney = result_data[i][1][1]-result_data[i][1][2];
            let rest_money = 0;
            let rate = result_data[i][0][3];

            find_period(loaner, result_data[i][0][1], addr, function(err, period){
                if(err){
                    console.log(err);
                }
                else{
                    if(loaner_restMoney > investigator_restMoney){
                        rest_money = investigator_restMoney;
                    }
                    else{
                        rest_money = loaner_restMoney;
                    }
                    // console.log('loaner : ' + loaner);
                    // console.log('investigator : ' + investigator);
                    // console.log('money : ' + rest_money);
                    // console.log('rate : ' + rate);
                    // console.log('period : ' + period);
                    // console.log('reason : ' + reason);
                    // console.log('addr : ' + addr);
                    // console.log('time : ' + time);
                    deploy_contract.deploy_contract("ReturnMoney.sol", investigator, parseInt(rest_money*(1+0.01*((rate/12)*period)), 10), rate, period, period*2592000, reason, function(rtaddr){
                        return_money_status(-1, "貸方", investigator, loaner, rest_money, parseInt(rest_money*(1+0.01*(rate/12)*period), 10), rate, period, "撮合", reason, addr, rtaddr, 1, time);                
                        save_expire_time(investigator, loaner, period, addr, rtaddr);
                    });
                }
            });      
        }        
    }
}

function save_expire_time(investigator, loaner, period, rtaddr, addr){
    let dateTime = new Date().getTime();
    let timestamp = Math.floor(dateTime / 1000);
    timestamp = timestamp + (period*2592000);

    let date = new Date(timestamp*1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return_money_expire(investigator, loaner, year, month, day, rtaddr,addr);
}

function schedule_event_check_return_expire(){

    let rule = new schedule.RecurrenceRule();
    
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;
    
    schedule.scheduleJob(rule, function(){
        console.log('scheduleRecurrenceRule:' + new Date());
        console.log('Send return money expire remind mail');
        dbConnection.getDBData('rtexpire', function(err, data){
            if(err){
                callback(err, null);
            }
            else{
                let size = data.length;

                let dateTime = new Date().getTime();
                let timestamp = Math.floor(dateTime / 1000);

                // let date = new Date(timestamp*1000);
                // let year = date.getFullYear();
                // let month = date.getMonth() + 1;
                // let day = date.getDate();

                for(let i = 0; i < size; i++){
                    if(data[i].cancel == -1){
                        if(data[i].succ == -1){
                            let remind_timeSrt = data[i].year+'-'+data[i].month+'-'+data[i].day;
                            let remind_Time = +new Date(remind_timeSrt);
                            let remind_timestamp = Math.floor(remind_Time / 1000);
                            let remind_timestamp_th = remind_timestamp - 259200;
                            if(timestamp >= remind_timestamp){
                                if(data[i].status == 0){
                                    let modSql = 'rtexpire SET status = ? WHERE contract_addr = ?';
                                    let modSqlParams = [1, data[i].contract_addr];
                                    dbConnection.updateData(modSql, modSqlParams);

                                    user.getUserMail(data[i].loaner, function(err, mail_addr){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            returnSuccMail(mailAddr, '借方', -1);
                                        }
                                    });

                                    getUserMail(data[i].investigator, function(err, mailAddr){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            returnFailMail(mailAddr, '貸方', -1);
                                        }
                                    });
                                }
                            }
                            if(timestamp >= remind_timestamp_th){
                                if(data[i].status == -1){
                                    let modSql = 'rtexpire SET status = ? WHERE contract_addr = ?';
                                    let modSqlParams = [0, data[i].contract_addr];
                                    dbConnection.updateData(modSql, modSqlParams);

                                    getUserMail(data[i].loaner, function(err, mailAddr){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            returnRemiderMail(mailAddr, data[i].investigator, '借方');
                                        }
                                    });

                                    getUserMail(data[i].investigator, function(err, mailAddr){
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            returnRemiderMail(mailAddr, data[i].loaner, '貸方');
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
                    
            }
        });
    });
}

function update_rtstatus(addr){

    deploy_contract.unlock_account();
    let result_data = matchMaker.getResult(addr);
    
    let size_x = result_data.length-1;

    if(size_x > 0){

        let flag_name = result_data[0][0][0];

        for(let i = 0; i < size_x; i++){

            let loaner = result_data[i][0][0];
   
            if(flag_name != loaner){
                getRestMoney(flag_name, addr, '撮合',function(err, min_money){
                    if(result_data[i-1][0][1]-result_data[i-1][0][2] < min_money){
                        update_returnMoneyStatus(flag_name, addr);
                    }
                });
            }
            flag_name = result_data[i][0][0];
        }            
        
        
        getRestMoney(result_data[size_x-1][0][0], addr, '撮合',function(err, min_money){
            if(result_data[size_x-1][0][1]-result_data[size_x-1][0][2] < min_money){
                update_returnMoneyStatus(result_data[size_x-1][0][0], addr);
            }
        });

        sendMatchMail(addr);

    }

}

function update_returnMoneyStatus(loaner, addr){
    let modSql = 'rtmoney SET status = ? WHERE rtcontract_addr = ? and loaner = ?';
    let modSqlParams = [-1, addr, loaner];
    dbConnection.updateData(modSql, modSqlParams);
}


function sendMatchMail(addr){
    dbConnection.getDBData('transaction', function(err, loaner){
        if(err){
            callback(err, null);
        }
        else{
            dbConnection.getDBData('invest', function(err, investigator){
                if(err){
                    callback(err, null);
                }
                else{
                    let loaner_size = loaner.length;
                    let investigator_size = investigator.length;
                    for(let i = 0; i < loaner_size; i++){
                        if(loaner[i].contract_addr == addr && loaner[i].cancel == -1){
                            getUserMail(loaner[i].username, function(err, mail_addr){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    matchMail(mail_addr);
                                }
                            })
                        }
                    }

                    for(let i = 0; i < investigator_size; i++){
                        if(investigator[i].contract_addr == addr && investigator[i].cancel == -1){
                            getUserMail(investigator[i].investigator, function(err, mail_addr){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    matchMail(mail_addr);
                                }
                            })
                        }
                    }
                }
            });
        }
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

function getUserInvestRestMonry(username, addr){
    dbConnection.getDBData('invest', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].contract_addr == addr){
                    callback(null, data[i].rest_money);
                    return;
                }
            }
        }
    });
}

function getUserLoanRestMoney(username, addr){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].contract_addr == addr){
                    callback(null, data[i].rest_money);
                    return;
                }
            }
        }
    });
}

function getReturnMoneyData(username, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let addr = [];
            for(let i = 0; i < size; i++){
                if(data[i].loaner == username && data[i].role == "貸方" && data[i].status != -1 && data[i].cancel == -1){
                    addr.push(data[i].contract_addr);
                }
            }
            callback(null, addr);
        }
    });
}


function getReturnDetail(addr, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let result = [];
            for(let i = 0; i < size; i++){
                if(data[i].rtcontract_addr == addr && data[i].role == "貸方" && data[i].cancel == -1 && data[i].contract_addr == '0x'){
                    result.push(data[i]);
                }
            }
            callback(null, result);
        }
    });
}

function getUserMoneyData(username, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let addr = [];
            for(let i = 0; i < size; i++){
                if(data[i].investigator == username && data[i].role == "貸方" && data[i].status != -1 && data[i].cancel == -1){
                    addr.push(data[i].contract_addr);
                }
            }
            callback(null, addr);
        }
    });
}

function getReturnInvestigator(addr, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].role == "貸方" && data[i].contract_addr == addr){
                    callback(null, data[i]); 
                    return;
                }
            }
            callback(null, -1);
        }
    });
}

function getReturnLoaner(addr, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let result = [];
            for(let i = 0; i < size; i++){
                if(data[i].role == "借方" && data[i].contract_addr == addr && data[i].rtcontract_addr == addr){
                    result.push(data[i]);
                }
            }
            callback(null, result);

        }
    });
}

function find_period(username, money, addr, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].money == money && data[i].contract_addr == addr){
                    callback(null, data[i].period);
                    return;
                }
            }
        }
    });
}

function getRestMoney(username, addr, type, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(type == "一般"){
                    if(data[i].contract_addr == addr){
                        callback(null, data[i].rest_money);
                        return;
                    }
                }
                else{
                    if(data[i].username == username && data[i].contract_addr == addr){
                        callback(null, data[i].rest_money);
                        return;
                    }
                }
            }
        }
    });
}

function getMakeMatchSucc(loaner, counter, addr, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let counter_size = counter[0];
            // let money = 0;
            // let succ = [];
            let min_money = [];
            // console.log('here : ' + addr);            
            // console.log('here : ' + loaner);
            // console.log('here : ' + counter);

            for(let i = 1; i <= counter_size; i++){
                // money = loaner[counter[i]-1][1] - loaner[counter[i]-1][2];
                // console.log('here money : ' + money);
                for(let j = 0; j < size; j++){
                    if(data[j].username == loaner[counter[i]-1][0] && data[j].contract_addr == addr){
                        // if(money >= data[j].rest_money){
                        //     succ.push(1);
                        // }
                        // else{
                        //     succ.push(0);
                        // }
                        min_money.push(data[j].rest_money);
                        break;
                    }
                }
            }
            // console.log('here succ :' + succ);
            callback(null, min_money);
        }
    });
}

function getLoanerANDInvestigator(addr, callback){
    dbConnection.getDBData('invest', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let flag = 0;
            let name = [];
            for(let i = 0; i < size; i++){
                if(data[i].contract_addr == addr && data[i].loan_type == '一般' && data[i].cancel == -1){
                    if(flag == 0){
                        name.push(data[i].loaner);
                        name.push(data[i].investigator);
                        flag = 1;
                    }
                    else{
                        name.push(data[i].investigator);
                    }
                }
            }
            callback(null, name);
        }
    });
}

function getUserfromReturn(addr, callback){
    dbConnection.getDBData('rtmoney', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let name = [];
            for(let i = 0; i < size; i++){
                if(data[i].contract_addr == addr && data[i].role == '貸方'){
                    name.push(data[i].loaner);
                    name.push(data[i].investigator);
                    break;
                }
            }
            callback(null, name);
        }
    });
}


module.exports.reg = reg;
module.exports.transact = transact;
module.exports.invest = invest;
module.exports.store_contract = store_contract;
module.exports.return_money = return_money;
module.exports.return_money_status = return_money_status;
module.exports.return_money_expire = return_money_expire;

module.exports.getUserMail = getUserMail;

module.exports.regMail = regMail;
module.exports.regUsername = regUsername;
module.exports.reuseMail = reuseMail;
module.exports.confirmMail = confirmMail;
module.exports.transactMail = transactMail;
module.exports.returnSuccMail = returnSuccMail;
module.exports.returnFailMail = returnFailMail;
module.exports.cancelMail = cancelMail;

module.exports.memberLogin = memberLogin;
module.exports.memberConfirm = memberConfirm;

module.exports.getUserData = getUserData;
module.exports.getUserLoanData = getUserLoanData;
module.exports.getUserInvestData = getUserInvestData;
module.exports.getNormalLoanData = getNormalLoanData;
module.exports.getUserReturnData = getUserReturnData;
module.exports.getAddressData = getAddressData;

module.exports.getTransaction = getTransaction;

module.exports.getUserReliable = getUserReliable;

module.exports.initContract = initContract;
module.exports.getWholeContract = getWholeContract;

module.exports.schedule_event_make_a_match = schedule_event_make_a_match;
module.exports.schedule_event_deploy_constract = schedule_event_deploy_constract;
module.exports.schedule_event_check_return_expire = schedule_event_check_return_expire;

module.exports.getContractAddr = getContractAddr;
module.exports.getNormalTransactionAddr = getNormalTransactionAddr;
module.exports.getUserInvestRestMonry = getUserInvestRestMonry;
module.exports.getUserLoanRestMoney = getUserLoanRestMoney;
module.exports.getReturnMoneyData = getReturnMoneyData;
module.exports.getReturnInvestigator = getReturnInvestigator;
module.exports.getReturnLoaner = getReturnLoaner;
module.exports.getOtherReturnData = getOtherReturnData;
module.exports.getUserMoneyData = getUserMoneyData;

module.exports.find_period = find_period;
module.exports.getRestMoney = getRestMoney;
module.exports.getMakeMatchSucc = getMakeMatchSucc;

module.exports.update_returnMoneyStatus = update_returnMoneyStatus;
module.exports.getLoanerANDInvestigator = getLoanerANDInvestigator;
module.exports.getUserfromReturn = getUserfromReturn;
module.exports.save_expire_time = save_expire_time;

module.exports.getReturnDetail = getReturnDetail;

