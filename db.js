// test.js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'db',
  password : 'qweszxc6304',
  port : 3306,
  database : 'bc_project'
});
 
connection.connect();
 
connection.query('SELECT 12 + 34 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});



// var mysql  = require('mysql');  
 
// var connection = mysql.createConnection({     
//   host     : 'localhost',
//   user     : 'db',
//   password : 'qweszxc6304',
//   port : 3306,
//   database : 'bc_project'
// }); 
 
// connection.connect();
 
// var  sql = 'SELECT * FROM websites';
// //查
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
 
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });
 
// connection.end();