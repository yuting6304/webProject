var dbConnection = require('dbConnection');

function loginStatus(){
    let account = req.body.account;
    let password = req.body.password;
    var online;
    dbConnection.getDBData('users', account, password, function(err, data){
        if(err){
            console.log("Error : ", err);
        }
        else{
            online = data;
            if(online == 1){
                return true;
            }
            else{
                return false;
            }
            // console.log(online);
        }
    });
}