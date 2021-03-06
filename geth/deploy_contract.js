const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const demo = 1; // 0 for print nothing
const ethereumUri = 'http://localhost:8545';

var user = require('../models/user');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const account0 = web3.eth.accounts[0]; // user

function gethConnection(){
    console.log('*************etherenum message*************');
    if(!web3.isConnected()){
        throw new Error('unable to connect to ethereum node at ' + ethereumUri);
    }else{
        if (demo == 1) console.log('connected to ehterum node at ' + ethereumUri);
        let coinbase = web3.eth.coinbase;
        if (demo == 1) console.log('coinbase:' + coinbase);
        let balance = web3.eth.getBalance(coinbase);
        if (demo == 1) console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
        let accounts = web3.eth.accounts;
        if (demo == 1) console.log(accounts);
        
        if (web3.personal.unlockAccount(account0, '1')) {
            if (demo == 1) console.log(`${account0} is unlocaked`);
        }else{
            if (demo == 1) console.log(`unlock failed, ${account0}`);
        }
    }
    console.log('*************etherenum message*************');
}


function unlock_account(){
    if (web3.personal.unlockAccount(account0, '1')) {
        if (demo == 1) console.log(`${account0} is unlocaked`);
    }else{
        if (demo == 1) console.log(`unlock failed, ${account0}`);
    }
}



/*********************************************************/
// deploy_matchmaker_contract(259200, "裝修房子"); // 600秒，合約類別
// deploy_crowdfunding_contract("施崇祐", 10, 1, 12, 600, "裝修房子"); // 合約擁有者 總金額 利率 其數 時間 合約類別
/*********************************************************/





function deploy_contract(contract_Name, owner, total_Money, interest, periods, duration, type, callback){
    let source = fs.readFileSync("./geth/contracts/" + contract_Name, 'utf8');

    if (demo == 1) console.log('compiling contract...');
    let compiledContract = solc.compile(source);
    if (demo == 1) console.log('done');

    for (let contractName in compiledContract.contracts) {
        // code and ABI that are needed by web3 
        // if (demo == 1) console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
        // if (demo == 1) console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
        var bytecode = compiledContract.contracts[contractName].bytecode;
        var abi = JSON.parse(compiledContract.contracts[contractName].interface);
    }

    // if (demo == 1) console.log(JSON.stringify(abi, undefined, 2));

    /*
    * deploy contract
    */ 
    let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
    if (demo == 1) console.log('gasEstimate = ' + gasEstimate);

    let MyContract = web3.eth.contract(abi);
    if (demo == 1) console.log('deploying contract...');


    if (contract_Name === "MatchMaker.sol"){
        //(秒, 錢)
        let myContractReturned = MyContract.new(duration, type, {
            from: account0,
            data: '0x'+ bytecode,
            gas: gasEstimate + 10000000000,
        }, function (err, myContract) {
            if (!err) {
                // NOTE: The callback will fire twice!
                // Once the contract has the transactionHash property set and once its deployed on an address.

                // e.g. check tx hash on the first call (transaction send)
                if (!myContract.address) {
                    if (demo == 1) console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
                
                // check address on the second call (contract deployed)
                } else {
                    global.contractAddress = myContract.address;
                    if (demo == 1) console.log('myContract.address = ' + myContract.address);
                    callback(myContract.address); // http://larry850806.github.io/2016/06/16/nodejs-async/
                }
                    

                // Note that the returned "myContractReturned" === "myContract",
                // so the returned "myContractReturned" object will also get the address set.
            } else {
                    if (demo == 1) console.log(err);
            }
        });
    } else if (contract_Name === "CrowdFunding.sol"){
        let myContractReturned = MyContract.new(owner, total_Money, interest, periods, duration, type, {
            from: account0,
            data: '0x'+ bytecode,
            gas: gasEstimate + 10000000000,
        }, function (err, myContract) {
            if (!err) {
                // NOTE: The callback will fire twice!
                // Once the contract has the transactionHash property set and once its deployed on an address.

                // e.g. check tx hash on the first call (transaction send)
                if (!myContract.address) {
                    if (demo == 1) console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
                
                // check address on the second call (contract deployed)
                } else {
                    global.contractAddress = myContract.address;
                    if (demo == 1) console.log('myContract.address = ' + myContract.address);
                    callback(myContract.address); // http://larry850806.github.io/2016/06/16/nodejs-async/
                }
                    

                // Note that the returned "myContractReturned" === "myContract",
                // so the returned "myContractReturned" object will also get the address set.
            } else {
                    if (demo == 1) console.log(err);
            }
        });
    }  else if (contract_Name === "ReturnMoney.sol"){
        let myContractReturned = MyContract.new(owner, total_Money, interest, periods, duration, type, {
            from: account0,
            data: '0x'+ bytecode,
            gas: gasEstimate + 10000000000,
        }, function (err, myContract) {
            if (!err) {
                // NOTE: The callback will fire twice!
                // Once the contract has the transactionHash property set and once its deployed on an address.

                // e.g. check tx hash on the first call (transaction send)
                if (!myContract.address) {
                    if (demo == 1) console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
                
                // check address on the second call (contract deployed)
                } else {
                    global.contractAddress = myContract.address;
                    if (demo == 1) console.log('myContract.address = ' + myContract.address);
                    callback(myContract.address); // http://larry850806.github.io/2016/06/16/nodejs-async/
                }
                    

                // Note that the returned "myContractReturned" === "myContract",
                // so the returned "myContractReturned" object will also get the address set.
            } else {
                    if (demo == 1) console.log(err);
            }
        });
    }
}


function deploy_matchmaker_contract(_duration, _kindOfContract, time){
    deploy_contract("MatchMaker.sol", "", "", "", "", _duration, _kindOfContract, function(RETURN_ADDRESS){
        /*
         * Return ADDRESS to MySql
         */
        //  console.log(RETURN_ADDRESS);
        user.store_contract(RETURN_ADDRESS, _kindOfContract, time);
    });
}

// function deploy_crowdfunding_contract(_owner, _total_Money, _interest, _periods, _duration,  _kindOfContract, _loan_type){
//     deploy_contract("CrowdFunding.sol", _owner, _total_Money, _interest, _periods, _duration,  _kindOfContract, function(RETURN_ADDRESS){
//         /*
//          * Return ADDRESS to MySql
//          */
//         setTimeout(store_in_db, 5000, _owner, _total_Money, _interest, _periods, _loan_type, _kindOfContract, RETURN_ADDRESS);
//         console.log(RETURN_ADDRESS);
//     });
// }

// function store_in_db(_owner, _total_Money, _interest, _periods, _loan_type, _kindOfContract, ADDR){
//     user.transact(_owner, _total_Money, _interest, _periods, _loan_type, _kindOfContract, ADDR);

// }


module.exports.deploy_contract = deploy_contract;
module.exports.deploy_matchmaker_contract = deploy_matchmaker_contract;
// module.exports.deploy_crowdfunding_contract = deploy_crowdfunding_contract;
module.exports.gethConnection = gethConnection;
module.exports.unlock_account = unlock_account;
