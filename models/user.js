var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');
var handlebars = require('handlebars');
var fs = require('fs');
var mysql  = require('mysql');  
var crypto = require('crypto');
var mailcredit = require('../models/mailsecret');
var dbConnection = require('../models/dbConnection');

// var status = 0;
// var acc;

// setting of nodemailer
smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
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

function reg(name, password, randstr, mailAddr){
    let  addSql = 'users(username, password, random_string, Email) VALUES(?,?,?,?)';
    let  addSqlParams = [name, password, randstr, mailAddr];
    dbConnection.setDBData(addSql, addSqlParams);

}

function transact(name, money, rate, period, loan_reason){
    let  addSql = 'transaction(username, money, rate, period, loan_reason) VALUES(?,?,?,?,?)';
    let  addSqlParams = [name, money, rate, period, loan_reason];
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
            throw err;
            callback(err);
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
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
            }
            else{
                consol.log('Email sent: ' + response);
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
                if(data[i].username == name && data[i].password == md5.update(pass).digest('hex') && data[i].confirm == 1){
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
            let reason = []
            for(let i = 0; i < size; i++){
                if(data[i].username == username && data[i].confirm == 1){
                    idx = idx+1;
                    index.push(idx);
                    money.push(data[i].money);
                    rate.push(data[i].rate);
                    period.push(data[i].period);
                    reason.push(data[i].loan_reason);
                }
            }

            result_data.push(index);
            result_data.push(money);
            result_data.push(rate);
            result_data.push(period);
            result_data.push(reason);
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


// function setloginStatus(a){
//     acc = a;
//     // status = s;
// }

// function getloginAccount(){

//     return acc;
// }

// function getloginStatus(){
//     return status;
// }

module.exports.reg = reg;
module.exports.transact = transact;
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
module.exports.getWholeLoanData = getWholeLoanData;

module.exports.getTransaction = getTransaction;

// module.exports.initUser = initUser;
// module.exports.setloginStatus = setloginStatus;
// module.exports.getloginStatus = getloginStatus;
// module.exports.getloginAccount = getloginAccount;
