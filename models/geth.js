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

module.exports.gethConnection = gethConnection;
