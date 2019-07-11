var mysql  = require('mysql'); 
var dbcredit = require('./dbsecret');

var connection;
// connect to mysql database
function connectDB(callback){
    connection = mysql.createConnection({     
        host     : dbcredit.host,       
        user     : dbcredit.user,              
        password : dbcredit.password,       
        port     : dbcredit.port,                   
        database : dbcredit.database,
    }); 

    connection.connect(function(err){
        if(err){
            throw err;
        }
        console.log("mysql connected");
        // mysql_query("SET NAMES 'utf8'");
        // create table user
        // let createUsers = 'create table if not exists users(id int not null auto_increment, username varchar(30) not null, password varchar(32) not null, first_name varchar(30) not null, last_name varchar(30) not null, gender varchar(30) not null, birthday varchar(30) not null, phone_number varchar(30) not null, credit_card_number varchar(30) not null, random_string varchar(8) not null, Email varchar(30) not null, confirm int not null default 0, primary key(id)) DEFAULT CHARSET=utf8';
        let createUsers = 'create table if not exists users(id int not null auto_increment, username varchar(30) not null, password varchar(32) not null, reliability varchar(1) not null, random_string varchar(8) not null, Email varchar(30) not null, confirm int not null default 0, primary key(id)) DEFAULT CHARSET=utf8';        
        // let createTransaction = 'create table if not exists transaction(id int not null auto_increment, username varchar(30) not null, money int not null, rate float not null, period int not null, loan_reason varchar(250) not null, random_string varchar(8) not null, confirm int not null default 0, primary key(id)) DEFAULT CHARSET=utf8';
        let createTransaction = 'create table if not exists transaction(id int not null auto_increment, username varchar(30) not null, reliability varchar(1) not null, money int not null, rate float not null, period int not null, loan_type varchar(20) not null, loan_reason varchar(250) not null, contract_addr varchar(50) not null, status int not null default 1, primary key(id)) DEFAULT CHARSET=utf8';        
        // let createUsers = 'create table if not exists users(id int not null auto_increment, username varchar(30) not null, account varchar(30) not null, password varchar(32) not null, first_name varchar(30) not null, last_name varchar(30) not null, gender varchar(30) not null, birthday varchar(30) not null, phone_number varchar(30) not null, credit_card_number varchar(30) not null, Email varchar(30) not null, confirm int not null default 0, primary key(id)) DEFAULT CHARSET=utf8';
        let createContract = 'create table if not exists contract(id int not null auto_increment, address varchar(50) not null, group_type varchar(50) not null, status int not null default 1, primary key(id)) DEFAULT CHARSET=utf8';        
        
        let createInvest = 'create table if not exists invest(id int not null auto_increment, investigator varchar(30) not null, loaner varchar(30) not null, reliability varchar(1) not null, money int not null, invest_money int not null, rate float not null, period int not null, loan_type varchar(20) not null, loan_reason varchar(250) not null, contract_addr varchar(50) not null, status int not null default 1, primary key(id)) DEFAULT CHARSET=utf8';        


        connection.query(createUsers, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Mysql(table): users has been created");
            }
        });
        connection.query(createTransaction, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Mysql(table): transaction has been created");
            }
        });
        connection.query(createInvest, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Mysql(table): invest has been created");
            }
        });
        connection.query(createContract, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Mysql(table): contract has been created");
                callback(null, 1);
            }
        });
    });
}

// insert data to database function
function setDBData(addSql, addSqlParams){
    // var  addSql = 'users(name, account, password) VALUES(?,?,?)';
    // var  addSqlParams = [name, account,password];
    connection.query('INSERT INTO ' + addSql,addSqlParams,function (err, results) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
            }        
       
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:',results);        
            console.log('-----------------------------------------------------------------\n');  
    });
    // connection.release();
}

// find data in database function
function getDBData(name, callback){
    connection.query('SELECT * FROM ' + name, function (err, results) {
        if(err){
            callback(err, null);
        } 
        else{
            callback(null, results);
        }                  
    });    
    // connection.release();
}

// update data in database function
function updateData(modSql, modSqlParams){
    connection.query('UPDATE ' + modSql, modSqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
    }        
        console.log('--------------------------UPDATE----------------------------');
        console.log('UPDATE affectedRows',result.affectedRows);
        console.log('------------------------------------------------------------');
    });
}

function deleteData(modSql, modSqlParams){
    connection.query('DELETE ' + modSql, modSqlParams,function (err, result) {
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
            return;
    }        
        console.log('--------------------------UPDATE----------------------------');
        console.log('DELETE affectedRows',result.affectedRows);
        console.log('------------------------------------------------------------');
    });
}


module.exports.connectDB = connectDB;
module.exports.setDBData = setDBData;
module.exports.getDBData = getDBData;
module.exports.updateData = updateData;

// module.exports.initDatabase = initDatabase;

// module.exports = dbConnection;