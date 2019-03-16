var mysql  = require('mysql'); 
var dbcredit = require('./dbsecret');
var connection;
var onlineFlag = 0;
function connectDB(){
    connection = mysql.createConnection({     
        host     : dbcredit.host,       
        user     : dbcredit.user,              
        password : dbcredit.password,       
        port     : dbcredit.port,                   
        database : dbcredit.database 
    }); 

    connection.connect(function(err){
        if(err){
            throw err;
        }
        console.log("mysql connected");
        let createUsers = 'create table if not exists users(id int not null auto_increment, username varchar(30) not null, account varchar(30) not null, password varchar(32) not null, first_name varchar(30) not null, last_name varchar(30) not null, gender varchar(30) not null, birthday varchar(30) not null, phone_number varchar(30) not null, credit_card_number varchar(30) not null, Email varchar(30) not null, confirm int not null default 0, online int not null default 0, primary key(id))';
        connection.query(createUsers, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
            else{
                console.log("Mysql(table): users has been created");
            }
        });
    });
}

function setDBData(addSql, addSqlParams){
    // var  addSql = 'INSERT INTO users(name, account, password) VALUES(?,?,?)';
    // var  addSqlParams = [name, account,password];
    connection.query(addSql,addSqlParams,function (err, results) {
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

function getDBData(name, callback){
    connection.query('SELECT * FROM '+ name, function (err, results) {
        if(err){
            callback(err, null);
        } 
        else{
            callback(null, results);
        }                  
    });    
    // connection.release();
}

module.exports.connectDB = connectDB;
module.exports.setDBData = setDBData;
module.exports.getDBData = getDBData;

// module.exports.initDatabase = initDatabase;

// module.exports = dbConnection;