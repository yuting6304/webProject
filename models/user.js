var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var mysql  = require('mysql');  
var mailcredit = require('../models/mailsecret');
var dbConnection = require('../models/dbConnection');

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

function reg(name, account, password, fname, lname, gender, date, phone, credit, mailAddr){
    var  addSql = 'INSERT INTO users(username, account, password, first_name, last_name, gender, birthday, phone_number, credit_card_number, Email) VALUES(?,?,?,?,?,?,?,?,?,?)';
    var  addSqlParams = [name, account, password, fname, lname, gender, date, phone, credit, mailAddr];
    dbConnection.setDBData(addSql, addSqlParams);
}

function confirmMail(mailAddr){
    var mailOptions = {
        from: 'P2P_Borrowing_Platform <wac33567@gmail.com>',
        to: mailAddr,
        subject: 'Confirm Email from P2P_Borrowing_Platform',
        html: '<h1>Welcome</h1><p>http://127.0.0.1:8080/</p>'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function memberLogin(acc, pass, callback){
    dbConnection.getDBData('users', function(err, data){
        if(err){
            callback(err, null);
        }
        else{
            let size = data.length;
            for(let i = 0; i < size; i++){
                if(data[i].account == acc && data[i].password == pass){
                    callback(null, 1);
                    return;
                }
            }
            callback(null, -1);
            return;
        }
    });
}

module.exports.reg = reg;
module.exports.confirmMail = confirmMail;
module.exports.memberLogin = memberLogin;
