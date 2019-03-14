var mysql  = require('mysql'); 
var connection;
function connect(){
    connection = mysql.createConnection({     
        host     : 'localhost',       
        user     : 'db',              
        password : 'qweszxc6304',       
        port: '3306',                   
        database: 'bc_project' 
    }); 

    connection.connect();
    console.log("mysql connected");
}

function query(addSql, addSqlParams){
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
            }        
       
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n');  
    });
}

module.exports.connect = connect;
module.exports.query = query;
// module.exports = dbConnection;