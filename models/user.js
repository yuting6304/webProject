var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var mysql  = require('mysql');  
var crypto = require('crypto');
var mailcredit = require('../models/mailsecret');
var dbConnection = require('../models/dbConnection');

// var status = 0;
// var acc;

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

function reg(name, password, fname, lname, gender, date, phone, credit, mailAddr){
    let  addSql = 'users(username, password, first_name, last_name, gender, birthday, phone_number, credit_card_number, Email) VALUES(?,?,?,?,?,?,?,?,?)';
    let  addSqlParams = [name, password, fname, lname, gender, date, phone, credit, mailAddr];
    dbConnection.setDBData(addSql, addSqlParams);
}

function confirmMail(mailAddr){
    var mailOptions = {
        from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
        to: mailAddr,
        subject: 'Confirm Email from P2P_Borrowing_Platform',
        html: '<h1>Welcome to P2P_Borrowing_Platform</h1><li><a href="http://127.0.0.1:8080/confirm">Click Here to Start Your Account</a></li>'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

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
                    else{
                        break;
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
module.exports.confirmMail = confirmMail;
module.exports.memberLogin = memberLogin;
// module.exports.initUser = initUser;
// module.exports.setloginStatus = setloginStatus;
// module.exports.getloginStatus = getloginStatus;
// module.exports.getloginAccount = getloginAccount;
