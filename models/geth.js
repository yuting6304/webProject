const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
/*
* connect to ethereum node
*/ 
const ethereumUri = 'http://localhost:8545';
const address = '0xf061f805973a5dbef437b21f2e2834572a515cdd'; // user
const user = 'qweszxc6304';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

function gethConnection(){
    if(!web3.isConnected()){
        console.log('unable to connect to ethereum node at ' + ethereumUri);
        // throw new Error('unable to connect to ethereum node at ' + ethereumUri);
    }else{
        console.log('connected to ehterum node at ' + ethereumUri);
        // let coinbase = web3.eth.coinbase;
        // console.log('coinbase:' + coinbase);
        // let balance = web3.eth.getBalance(coinbase);
        // console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
        // let accounts = web3.eth.accounts;
        // console.log(accounts);


        // if (web3.personal.unlockAccount(address, user)) {
        //     console.log(`${address} is unlocaked`);
        // }else{
        //     console.log('unlock failed');
        // }
    }
}

function deployContract(){
    if (web3.personal.unlockAccount(address, user)) {
        console.log(`${address} is unlocaked`);
    }else{
        console.log('unlock failed');
    }



    let source = fs.readFileSync("../contracts/CrowdFunding.sol", 'utf8');
    console.log('compiling contract...');
    let compiledContract = solc.compile(source);
    console.log('done');
    for (let contractName in compiledContract.contracts) {
        // code and ABI that are needed by web3 
        // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
        // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
        var bytecode = compiledContract.contracts[contractName].bytecode;
        var abi = JSON.parse(compiledContract.contracts[contractName].interface);
    }

    console.log(JSON.stringify(abi, undefined, 2));


    let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
    console.log('gasEstimate = ' + gasEstimate);

    let MyContract = web3.eth.contract(abi);
    console.log('deploying contract...');

    let myContractReturned = MyContract.new([], {
        from: address,
        data: '0x'+ bytecode,
        gas: gasEstimate + 50000
    }, function (err, myContract) {
        if (!err) {
            // NOTE: The callback will fire twice!
            // Once the contract has the transactionHash property set and once its deployed on an address.
        
            // e.g. check tx hash on the first call (transaction send)
            if (!myContract.address) {
                console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
            
            // check address on the second call (contract deployed)
            } else {
                console.log(`myContract.address = ${myContract.address}`); // the contract address
                global.contractAddress = myContract.address;
                return;
            }
        
            // Note that the returned "myContractReturned" === "myContract",
            // so the returned "myContractReturned" object will also get the address set.
        } else {
            console.log(err);
        }
    });
}

module.exports.gethConnection = gethConnection;
