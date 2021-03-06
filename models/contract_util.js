var user = require('./user');
var dbConnection = require('./dbConnection');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');
var crowd_fund = require('../geth/call_CrowdFunding');
var return_money = require('../geth/call_ReturnMoney');

function getCurrentAmount(callback){
    user.getNormalLoanData(function(err, data){
        if(err){
            console.log(err);
            callback(err, null);
        }
        else{
            deploy_contract.unlock_account();

            let size = data.length;
            let amount = [];
            let time = [];
            let result = [];
            for(let i = 0; i < size; i++){
                let current = crowd_fund.show_RESTAMOUNT(data[i].contract_addr);
                amount.push(current);
            }
            for(let i = 0; i < size; i++){
                let t = crowd_fund.show_DURATION(data[i].contract_addr).toNumber();
                time.push(t);
            }
            result.push(amount);
            result.push(time);
            callback(null, result);
        }
    });
}

function getRestTime(callback){
    user.getNormalLoanData(function(err, data){
        if(err){
            console.log(err);
            callback(err, null);
        }
        else{
            deploy_contract.unlock_account();

            let size = data.length;
            let time = [];
            for(let i = 0; i < size; i++){
                let t = crowd_fund.show_DURATION(data[i].contract_addr).toNumber();
                time.push(t);
            }
            callback(null, time);
        }
    });
}


function getReturnAmount(username, callback){
    user.getReturnMoneyData(username, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            deploy_contract.unlock_account();
            let size = data.length;
            let result = [];
            let amount = [];
            let time = [];

            for(let i = 0; i < size; i++){
                let rest = return_money.show_RESTAMOUNT(data[i]);
                amount.push(rest);
            }
            for(let i = 0; i < size; i++){
                let t = return_money.show_DURATION(data[i]).toNumber();
                time.push(t);
            }

            result.push(amount);
            result.push(time);
            callback(null, result);
        }
    });
}


function getOtherReturnAmount(username, callback){
    user.getUserMoneyData(username, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            deploy_contract.unlock_account();
            let size = data.length;
            let result = [];
            let amount = [];
            let time = [];

            for(let i = 0; i < size; i++){
                let rest = return_money.show_RESTAMOUNT(data[i]);
                amount.push(rest);
            }
            for(let i = 0; i < size; i++){
                let t = return_money.show_DURATION(data[i]).toNumber();
                time.push(t);
            }

            result.push(amount);
            result.push(time);
            callback(null, result);
        }
    });
}

module.exports.getCurrentAmount = getCurrentAmount;
module.exports.getRestTime = getRestTime;
module.exports.getReturnAmount = getReturnAmount;
module.exports.getOtherReturnAmount = getOtherReturnAmount;
