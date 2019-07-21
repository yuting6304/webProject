var app = require('../app')
var express = require('express');
var moment = require('moment');

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
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log('time : ' + time);

    let opt = req.query.option;
    console.log("success arrived");
                    
    console.log('option = ' + opt);
    // let result = matchMaker.getResult('0x75728475a27a5485dee62691f45a0c2c1578a540');

    // console.log('Result : ' + result[0][0][0]);

    // console.log('length 0 : ' + result.length);
    // console.log('length 0 : ' + result[0].length);
    // console.log('length 0 : ' + result[0][0].length);

    // let modSql = 'users SET reliability = ? WHERE username = ?';
    // let modSqlParams = ['A', 'qweszxc6304'];
    // dbConnection.updateData(modSql, modSqlParams);
    if(opt == "開始撮合"){
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
    }
    else if(opt == "測資1"){
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');    
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');

        matchMaker.addUser('BORROWER', "123", 200000, 11, "A", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 11, "A", '0xd0d25a1ac7f39064687de66872064a50b6f35c0b');


        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        
        user.transact('123', 'A', 200000, 11, 1, '撮合', '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        user.transact('qweszxc6304', 'A', 500000, 11, 1, '撮合', '投資理財', '0xd0d25a1ac7f39064687de66872064a50b6f35c0b', time);
        
    }
    else if(opt == "測資2"){
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');       
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');       
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');       
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');

        matchMaker.addUser('BORROWER', "123", 260000, 11, "A", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 11, "A", '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');

        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);

        user.transact('123', 'A', 260000, 11, 1, '撮合', '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
        user.transact('qweszxc6304', 'A', 500000, 11, 1, '撮合', '裝修房屋', '0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd', time);
    }
    else if(opt == "測資3"){
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0xe4f9669402801677210125af752dd8c8791d3e3a');
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0xe4f9669402801677210125af752dd8c8791d3e3a');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0xe4f9669402801677210125af752dd8c8791d3e3a'); 
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0xe4f9669402801677210125af752dd8c8791d3e3a');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0xe4f9669402801677210125af752dd8c8791d3e3a');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0xe4f9669402801677210125af752dd8c8791d3e3a');    
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0xe4f9669402801677210125af752dd8c8791d3e3a');

        matchMaker.addUser('BORROWER', "123", 200000, 36, "A", '0xe4f9669402801677210125af752dd8c8791d3e3a');       
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 36, "A", '0xe4f9669402801677210125af752dd8c8791d3e3a');

        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);

        user.transact('123', 'A', 200000, 36, 1, '撮合', '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
        user.transact('qweszxc6304', 'A', 500000, 36, 1, '撮合', '進修/教育支出', '0xe4f9669402801677210125af752dd8c8791d3e3a', time);
    }
    else if(opt == "資訊1"){
        showInfo('0xd0d25a1ac7f39064687de66872064a50b6f35c0b');
    }
    else if(opt == "資訊2"){
        showInfo('0x4d4365c183ff5bff830c0f944f2fb7507b0a29dd');
    }
    else if(opt == "資訊3"){
        showInfo('0xe4f9669402801677210125af752dd8c8791d3e3a');
    }
    

    // res.redirect('/match_test');
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
