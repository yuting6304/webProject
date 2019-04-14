var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var mysql  = require('mysql');  
var crypto = require('crypto');
var mailcredit = require('../models/mailsecret');
var dbConnection = require('../models/dbConnection');

// var status = 0;
// var acc;

// setting of nodemailer
var transporter = nodemailer.createTransport({
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
function reg(name, password, fname, lname, gender, date, phone, credit, randstr, mailAddr){
    let  addSql = 'users(username, password, first_name, last_name, gender, birthday, phone_number, credit_card_number, random_string, Email) VALUES(?,?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [name, password, fname, lname, gender, date, phone, credit, randstr, mailAddr];
    dbConnection.setDBData(addSql, addSqlParams);
}

function transact(name, money, rate, period, credit, loan_reason, rand){
    let  addSql = 'transaction(username, money, rate, period, credit_card_number, loan_reason, random_string) VALUES(?,?,?,?,?,?,?)';
    let  addSqlParams = [name, money, rate, period, credit, loan_reason, rand];
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
            html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>Your username had been used before, Please use another mail address to register again!</p><li><a href="http://127.0.0.1:8080/register">Click Here to register Your Account</a></li>'
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
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// send a confirm mail to user to get start their account
function confirmMail(mailAddr, randstr){
    let mailOptions = {
        from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
        to: mailAddr,
        subject: 'Confirm Email from P2P_Borrowing_Platform',
        html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>Your Verification token is ' + randstr + '</p><br/><li><a href="http://127.0.0.1:8080/confirm">Click Here to Start Your Account</a></li>'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function transactMail(mailAddr, randstr){
    let mailOptions = {
        from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
        to: mailAddr,
        subject: 'Transaction notification from P2P_Borrowing_Platform',
        html: '<h1>Welcome to P2P_Borrowing_Platform</h1><p>Your Verification token is ' + randstr + '</p>'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function transactConfirm(username, token, callback){
    dbConnection.getDBData('transaction', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].username == username){
                    if(data[i].random_string == token){
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

function memberConfirm(name, pass, token, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            let md5 = crypto.createHash('md5');
            for(let i = 0; i < size; i++){
                if(data[i].username == name && data[i].password == md5.update(pass).digest('hex') && data[i].random_string == token){
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
module.exports.transactConfirm = transactConfirm;

// module.exports.initUser = initUser;
// module.exports.setloginStatus = setloginStatus;
// module.exports.getloginStatus = getloginStatus;
// module.exports.getloginAccount = getloginAccount;
