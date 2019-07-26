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
        res.render('match_test', { title: 'Log out', account: req.session.username});
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
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');    
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');

        matchMaker.addUser('BORROWER', "123", 200000, 11, "A", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 11, "A", '0xcb786908a083781b8f1d560e96c5d126f7c485c4');


        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        
        user.transact('123', 'A', 200000, 11, 1, '撮合', '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        user.transact('qweszxc6304', 'A', 500000, 11, 1, '撮合', '投資理財', '0xcb786908a083781b8f1d560e96c5d126f7c485c4', time);
        
    }
    else if(opt == "測資2"){
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0x24a163f30a4ee5ed2344b132726f377ec2967140');       
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0x24a163f30a4ee5ed2344b132726f377ec2967140');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0x24a163f30a4ee5ed2344b132726f377ec2967140');       
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0x24a163f30a4ee5ed2344b132726f377ec2967140');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0x24a163f30a4ee5ed2344b132726f377ec2967140');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0x24a163f30a4ee5ed2344b132726f377ec2967140');       
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0x24a163f30a4ee5ed2344b132726f377ec2967140');

        matchMaker.addUser('BORROWER', "123", 260000, 11, "A", '0x24a163f30a4ee5ed2344b132726f377ec2967140');
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 11, "A", '0x24a163f30a4ee5ed2344b132726f377ec2967140');

        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);

        user.transact('123', 'A', 260000, 11, 1, '撮合', '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
        user.transact('qweszxc6304', 'A', 500000, 11, 1, '撮合', '裝修房屋', '0x24a163f30a4ee5ed2344b132726f377ec2967140', time);
    }
    else if(opt == "測資3"){
        matchMaker.addUser('INVESTOR', "aaa", 260000, 11, "A", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');
        matchMaker.addUser('INVESTOR', "bbb", 220000, 22, "B", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');
        matchMaker.addUser('INVESTOR', "ccc", 700000, 33, "B", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a'); 
        matchMaker.addUser('INVESTOR', "ddd", 250000, 11, "B", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');
        matchMaker.addUser('INVESTOR', "eee", 1, 11, "B", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');
        matchMaker.addUser('INVESTOR', "fff", 1, 11, "C", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');    
        matchMaker.addUser('INVESTOR', "ggg", 1, 11, "B", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');

        matchMaker.addUser('BORROWER', "123", 200000, 36, "A", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');       
        matchMaker.addUser('BORROWER', "qweszxc6304", 500000, 36, "A", '0xcad9ac6bbe9570f800099e78577ab59c27ce813a');

        user.invest('aaa', "撮合者", '無', 0, 260000, 11, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('bbb', "撮合者", '無', 0, 220000, 22, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('ccc', "撮合者", '無', 0, 700000, 33, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('ddd', "撮合者", '無', 0, 250000, 11, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('eee', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('fff', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.invest('ggg', "撮合者", '無', 0, 1, 11, 1, "撮合", '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);

        user.transact('123', 'A', 200000, 36, 1, '撮合', '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
        user.transact('qweszxc6304', 'A', 500000, 36, 1, '撮合', '進修/教育支出', '0xcad9ac6bbe9570f800099e78577ab59c27ce813a', time);
    }
    else if(opt == "資訊1"){
        showInfo('0xcb786908a083781b8f1d560e96c5d126f7c485c4');
    }
    else if(opt == "資訊2"){
        showInfo('0x24a163f30a4ee5ed2344b132726f377ec2967140');
    }
    else if(opt == "資訊3"){
        showInfo('0xcad9ac6bbe9570f800099e78577ab59c27ce813a');
    }
    else if(opt == "結果1"){
        // showResult('0xcb786908a083781b8f1d560e96c5d126f7c485c4', '投資理財');
        setTimeout(showResult, 1000, '0xcb786908a083781b8f1d560e96c5d126f7c485c4', '投資理財');
    }
    else if(opt == "結果2"){
        showResult('0x24a163f30a4ee5ed2344b132726f377ec2967140', '裝修房屋');
    }
    else if(opt == "結果3"){
        showResult('0xcad9ac6bbe9570f800099e78577ab59c27ce813a', '進修/教育支出');        
    }
    else if(opt == "改DB"){
        let modSql = 'rtmoney SET period = ? WHERE rtID = ?';
        let modSqlParams = [1, -1];
        dbConnection.updateData(modSql, modSqlParams);
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



function updateContract(addr){
    matchMaker.upDateContract(addr);
}

function showResult(addr, reason){
    // console.log(matchMaker.getResult(addr));
    addResultInDB(addr, reason);
    // console.log('investors : ' + matchMaker.show_INVESTORS(addr));
}

function showInfo(addr){
    matchMaker.showAllInfo(addr);
}

function addResultInDB(addr, reason){
    deploy_contract.unlock_account();
    let result_data = matchMaker.getResult(addr);
    console.log('reason : ' + reason);
    console.log(result_data);


    let size_x = result_data.length-1;
    console.log('x = ' + size_x);


    if(size_x > 0){
        let size_y = result_data[0].length;
        let size_z = result_data[0][0].length;


        // console.log('y = ' + size_y);
        // console.log('z = ' + size_z);

        for(let i = 0; i < size_x; i++){
            let time = moment().format('MMMM Do YYYY, h:mm:ss a');
            let loaner = result_data[i][0][0];
            let investigator = result_data[i][1][0];
            let loaner_restMoney = result_data[i][0][1]-result_data[i][0][2];
            let investigator_restMoney = result_data[i][1][1]-result_data[i][1][2];
            let rest_money = 0;
            let rate = result_data[i][0][3];
            user.find_period(loaner, result_data[i][0][1], addr, function(err, period){
                if(err){
                    console.log(err);
                }
                else{
                    if(loaner_restMoney > investigator_restMoney){
                        rest_money = investigator_restMoney;
                    }
                    else{
                        rest_money = loaner_restMoney;
                    }
                    console.log('loaner : ' + loaner);
                    console.log('investigator : ' + investigator);
                    console.log('money : ' + rest_money);
                    console.log('rate : ' + rate);
                    console.log('period : ' + period);
                    console.log('reason : ' + reason);
                    console.log('addr : ' + addr);
                    console.log('time : ' + time);
        
                    deploy_contract.deploy_contract("ReturnMoney.sol", investigator, rest_money, rate, period, period*2592000, reason, function(rtaddr){
                        user.return_money(-1, "貸方", investigator, loaner, rest_money, rate, period, "撮合", reason, addr, rtaddr, time);                
                    });
                }
            });
        }
    }
}


module.exports = router;
module.exports = app;
