var mysql  = require('mysql'); 
var connection;
var onlineFlag = 0;
function connectDB(){
    connection = mysql.createConnection({     
        host     : 'localhost',       
        user     : 'db',              
        password : 'qweszxc6304',       
        port: '3306',                   
        database: 'bc_project' 
    }); 

    connection.connect(function(err){
        if(err){
            throw err;
        }
        console.log("mysql connected");
        let createUsers = 'create table if not exists users(id int not null auto_increment, username varchar(30) not null, account varchar(30) not null, password varchar(30) not null, first_name varchar(30) not null, last_name varchar(30) not null, gender varchar(30) not null, birthday varchar(30) not null, phone_number varchar(30) not null, credit_card_number varchar(30) not null, Email varchar(30) not null, confirm int not null default 0, online int not null default 0, primary key(id))';
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
}

function getDBData(name, acc, pass, callback){
        connection.query('SELECT * FROM '+ name, function (err, results) {
            if(err){
                callback(err, null);
            }                   
            let size = results.length;
            for(let i = 0; i < size; i++){
                if(results[i].account == acc && results[i].password == pass){
                    // console.log("login successful! ");
                    callback(null, 1);
                    return;
                }
            }
            // console.log("login fail! ");
            callback(null, -1);
            return;

        });    
}

module.exports.connectDB = connectDB;
module.exports.setDBData = setDBData;
module.exports.getDBData = getDBData;

// module.exports.initDatabase = initDatabase;

// module.exports = dbConnection;