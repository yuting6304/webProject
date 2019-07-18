var user = require('./user');
var dbConnection = require('./dbConnection');
var matchMaker = require('../geth/call_MatchMaker');
var deploy_contract = require('../geth/deploy_contract');
var crowd_fund = require('../geth/call_CrowdFunding');


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



module.exports.getCurrentAmount = getCurrentAmount;
module.exports.getRestTime = getRestTime;
