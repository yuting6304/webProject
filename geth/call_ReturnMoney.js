const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const ethereumUri = 'http://localhost:8545';  
const demo = 0;


var addr = "0x0f5b224962881fa275c85e59b4feac52f6f0bc17";
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const address0 =  web3.eth.accounts[0];// user
// if (!web3.isConnected()) {
//   throw new Error('unable to connect to ethereum node at ' + ethereumUri);
// } else {
//   let coinbase = web3.eth.coinbase;
//   if (demo == 1) console.log('coinbase:' + coinbase);
//   let balance = web3.eth.getBalance(coinbase);
//   if (demo == 1) console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
//   let accounts = web3.eth.accounts;
//   if (demo == 1) console.log(accounts);

//   if (web3.personal.unlockAccount(address0, '1')) {
//     if (demo == 1) console.log(`${address0} is unlocaked`);
//   } else {
//     if (demo == 1) console.log(`unlock failed, ${address0}`);
//   }
// }





/*********************************************************/
// fund("12345", 1, "0xbfe4bd37cc3e9a3927d00df1c768511530213c7a"); // 名稱, 錢
// fund("yuting", 21);  // 名稱, 錢
// console.log(getResult());
// console.log(showAllInfo());
// upDateContract();
/*********************************************************/


function cancel_INVEST(ADDR){
  var value = getContractInfo(ADDR);
  value[0].cancel_invest({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
}


function fund(_name, _fundMoney, ADDR){
  var value = getContractInfo(ADDR); 
  value[0].fund(_name, _fundMoney, {from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  console.log("return money success");
}

function getResult(ADDR, callback){
  var value = getContractInfo(ADDR);

  // value[0].checkGoalReached({from: address0, gas: value[1]});
  var result = value[0].get_TRANSACTION({from: address0, gas: value[1]});
  value[0].afterGet_TRANSACTION(result, {from: address0, gas: value[1]});

  // callback(null, show_TRANSACTION(ADDR).split(","));
  return show_TRANSACTION(ADDR).split(",");
  // [合約擁有者, 借款人1, 借款人2]
}

function upDateContract(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
}





/*********************************************************/
/****************** Getters and Setters ******************/
/*********************************************************/
function showAllInfo(ADDR) {
  var value = getContractInfo(ADDR);
  // value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].showAllInfo({from: address0, gas: value[1]});
  // value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_TRANSACTION(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].TRANSACTION({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_KIND_OF_CONTRACT(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].KIND_OF_CONTRACT({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_OWNER(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].OWNER({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_DEADLINE(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].DEADLINE({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_FINISH_TIME(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].FINISH_TIME({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_GOALAMOUNT(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].GOALAMOUNT({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_CURRENTAMOUNT(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].currentAmount({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_RESTAMOUNT(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].rest_Amount({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_INTEREST(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].INTEREST({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_PERIODS(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].PERIODS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_DURATION(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].DURATION({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_STATUS(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].get_STATUS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_INVESTORS(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].get_INVESTORS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  if(val == ""){
    return val;
  }
  else{
    return val.split(",");
  }
}

function show_NUMINVESTORS(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].numInvestors({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}





/*********************************************************/
/********************      Utils      ********************/
/*********************************************************/
function getContractInfo(Contract_Address) {
  let source = fs.readFileSync("./geth/contracts/CrowdFunding.sol", 'utf8');
  if (demo == 1) console.log('compiling contract...');
  let compiledContract = solc.compile(source);
  if (demo == 1) console.log('done');

  for (let contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
  }
  let gasestimate = web3.eth.estimateGas({ data: '0x' + bytecode }) + 300000;

  // https://ethereum.stackexchange.com/questions/55222/uncaught-typeerror-this-eth-sendtransaction-is-not-a-function?rq=1
  // https://blog.csdn.net/hdyes/article/details/80818183
  var contract = web3.eth.contract(abi).at(Contract_Address);
  return [contract, gasestimate];
}


module.exports.cancel_INVEST = cancel_INVEST;

module.exports.fund = fund;
module.exports.getResult = getResult;
module.exports.showAllInfo = showAllInfo;
module.exports.upDateContract = upDateContract;
module.exports.show_CURRENTAMOUNT = show_CURRENTAMOUNT;
module.exports.show_GOALAMOUNT = show_GOALAMOUNT;
module.exports.show_RESTAMOUNT = show_RESTAMOUNT;
module.exports.show_INVESTORS = show_INVESTORS;
module.exports.show_DURATION = show_DURATION;
