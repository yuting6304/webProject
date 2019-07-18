var app = require('../app')
var express = require('express');
var user = require('../models/user');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');
var dbConnection = require('../models/dbConnection');

var app = express(); // 產生express application物件
var router = express.Router();

app.use(router);

router.get('/', function(req, res, next) {
    if(req.session.logined){
        res.render('match_test', { title: 'Log out', account: req.session.username});
    }
    else{
        res.redirect('login');
    }
});

router.post('/', function(req, res, next){
    console.log("success arrived");
                    
    // let result = matchMaker.getResult('0x75728475a27a5485dee62691f45a0c2c1578a540');

    // console.log('Result : ' + result[0][0][0]);

    // console.log('length 0 : ' + result.length);
    // console.log('length 0 : ' + result[0].length);
    // console.log('length 0 : ' + result[0][0].length);

    // let modSql = 'users SET reliability = ? WHERE username = ?';
    // let modSqlParams = ['A', 'qweszxc6304'];
    // dbConnection.updateData(modSql, modSqlParams);
    user.getWholeContract(function(err, data){
        if(err){
            console.log(err);
        }
        else{
            let size = data.length;
            deploy_contract.unlock_account();
            for(let i = 0; i < size; i++){
                if(data[i].status == 1 /*&& data[i].group_type == "償還債務"*/){
                    console.log(data[i].address);
                    // let modSql = 'contract SET status = ? WHERE address = ?';
                    // let modSqlParams = [-1, data[i].address];
                    // dbConnection.updateData(modSql, modSqlParams);
                    
                    matchMaker.make_a_match(data[i].address);
                    
                    setTimeout(updateDBstatus, 20000, data[i].address);


                    // let modSql1 = 'invest SET status = ? WHERE contract_addr = ? and loan_type = ?';
                    // let modSqlParams1 = [0, data[i].address, "撮合"];
                    // dbConnection.updateData(modSql1, modSqlParams1);

                    // let modSql2 = 'transaction SET status = ? WHERE contract_addr = ? and loan_type = ?';
                    // let modSqlParams2 = [0, data[i].address, "撮合"];
                    // dbConnection.updateData(modSql2, modSqlParams2);
                    // showResult(data[i].address);
                    // updateDB(result, '0x75728475a27a5485dee62691f45a0c2c1578a540');
                    // setTimeout(updateContract, 30000, '0x75728475a27a5485dee62691f45a0c2c1578a540');
                    // setTimeout(showResult, 50000, '0x75728475a27a5485dee62691f45a0c2c1578a540');
                    // setTimeout(showInfo, 70000, '0x75728475a27a5485dee62691f45a0c2c1578a540');

                }
            }
        }
    });

    res.redirect('/match_test');
});

function updateDBstatus(addr){
    let modSql = 'contract SET status = ? WHERE address = ?';
    let modSqlParams = [-1, addr];
    dbConnection.updateData(modSql, modSqlParams);

    let modSql1 = 'invest SET status = ? WHERE contract_addr = ? and loan_type = ?';
    let modSqlParams1 = [0, addr, "撮合"];
    dbConnection.updateData(modSql1, modSqlParams1);

    let modSql2 = 'transaction SET status = ? WHERE contract_addr = ? and loan_type = ?';
    let modSqlParams2 = [0, addr, "撮合"];
    dbConnection.updateData(modSql2, modSqlParams2);
}


function updateDB(result_data, addr){


    let size_x = result_data.length;
    let size_y = result_data[0].length;
    let size_z = result_data[0][0].length;


    console.log('Result : ' + result_data);

    console.log('x = ' + size_x);
    console.log('y = ' + size_y);
    console.log('z = ' + size_z);

    for(let x = 0; x < size_x; x++){
        for(let y = 0; y < size_y; y++){
            for(let z = 0; z < size_z; z++){
                if(y == 0){
                    user.getUserLoanRestMoney(result_data[i][j][k]);
                }
                else if(y == 1){

                }
            }
        }
    }


    // let modSql = 'invest SET rest_money = ? WHERE contract_addr = ? and investigator = ?';
    // let modSqlParams = [-1, addr, "aaa"];
    // dbConnection.updateData(modSql, modSqlParams);
}

function updateContract(addr){
    matchMaker.upDateContract(addr);
}

function showResult(addr){
    console.log(matchMaker.getResult(addr));
    // console.log('investors : ' + matchMaker.show_INVESTORS(addr));
}

function showInfo(addr){
    matchMaker.showAllInfo(addr);
}

module.exports = router;
module.exports = app;
