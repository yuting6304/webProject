const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const ethereumUri = 'http://localhost:8545';
const demo = 0;

var addr = "0x2e1f8d4587c9c366becb918977c4631abc32d458";
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const address0 = web3.eth.accounts[0];// user
if (!web3.isConnected()) {
  throw new Error('unable to connect to ethereum node at ' + ethereumUri);
} else {
  let coinbase = web3.eth.coinbase;
  if (demo == 1) console.log('coinbase:' + coinbase);
  let balance = web3.eth.getBalance(coinbase);
  if (demo == 1) console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
  let accounts = web3.eth.accounts;
  if (demo == 1) console.log(accounts);

  if (web3.personal.unlockAccount(address0, '1')) {
    if (demo == 1) console.log(`${address0} is unlocaked`);
  } else {
    if (demo == 1) console.log(`unlock failed, ${address0}`);
  }
}



/*********************************************************/

// addDefaultUser('0x8d34603cb9785c83b7f0bffc3ef87f9c1dc1402d');
// make_a_match('0x8d34603cb9785c83b7f0bffc3ef87f9c1dc1402d');

// getResult('0x8d34603cb9785c83b7f0bffc3ef87f9c1dc1402d');
// showAllInfo('0x1b8367c08a91a43c51eec083c55debcbe813d819');
// console.log(show_BORROWERS('0x42ad5cdaa15215cc6ac27944bad009cc98893e76'));
// console.log(show_INVESTORS('0x42ad5cdaa15215cc6ac27944bad009cc98893e76'));


function addDefaultUser(addr) {
  addUser('INVESTOR', "aaa", 260000, 11, "A", addr);
  addUser('INVESTOR', "bbb", 220000, 22, "B", addr);
  addUser('INVESTOR', "ccc", 700000, 33, "B", addr);
  addUser('INVESTOR', "ddd", 250000, 11, "B", addr);
  addUser('INVESTOR', "eee", 1, 11, "B", addr);
  addUser('INVESTOR', "fff", 1, 11, "C", addr);
  addUser('INVESTOR', "ggg", 1, 11, "B", addr);
  // addUser('INVESTOR', "施崇祐", 260000, 11, "A", addr);
  // addUser('INVESTOR', "陳姿妤", 220000, 22, "B", addr);
  // addUser('INVESTOR', "李昱廷", 700000, 33, "B", addr);
  // addUser('INVESTOR', "蔡英文", 250000, 11, "B", addr);
  // addUser('INVESTOR', "馬英九", 1, 11, "B", addr);
  // addUser('INVESTOR', "小紅帽", 1, 11, "C", a);
  // addUser('INVESTOR', "艾希", 1, 11, "B");
  // addUser('INVESTOR', "施崇祐", 260000, 11, "A");
  // addUser('INVESTOR', "陳姿妤", 220000, 22, "B");
  // addUser('INVESTOR', "李昱廷", 700000, 33, "B");
  // addUser('INVESTOR', "蔡英文", 250000, 11, "B");
  // addUser('INVESTOR', "馬英九", 1, 11, "B");
  // addUser('INVESTOR', "小紅帽", 1, 11, "C");
  // addUser('INVESTOR', "艾希", 1, 11, "B");
  // addUser('INVESTOR', "施崇祐", 260000, 11, "A");
  // addUser('INVESTOR', "陳姿妤", 220000, 22, "B");
  // addUser('INVESTOR', "李昱廷", 700000, 33, "B");
  // addUser('INVESTOR', "蔡英文", 250000, 11, "B");
  // addUser('INVESTOR', "馬英九", 1, 11, "B");
  // addUser('INVESTOR', "小紅帽", 1, 11, "C");
  // addUser('INVESTOR', "艾希", 1, 11, "B");
  // addUser('INVESTOR', "施崇祐", 260000, 11, "A");
  // addUser('INVESTOR', "陳姿妤", 220000, 22, "B");
  // addUser('INVESTOR', "李昱廷", 700000, 33, "B");
  // addUser('INVESTOR', "蔡英文", 250000, 11, "B");
  // addUser('INVESTOR', "馬英九", 1, 11, "B");
  // addUser('INVESTOR', "小紅帽", 1, 11, "C");
  // addUser('INVESTOR', "艾希", 1, 11, "B");
  
  // addUser('INVESTOR', "哈哈哈", 6666, 11, "A", addr);  
  // addUser('BORROWER', "合和合", 6666, 11, "A", addr);

  addUser('BORROWER', "123", 200000, 11, "A", addr);
  addUser('BORROWER', "456", 500000, 11, "A", addr);
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");
  // addUser('BORROWER', "法洛士", 200000, 11, "A");
  // addUser('BORROWER', "咸蛋超人", 500000, 11, "A");

}
/*********************************************************/


function cancel_makeMatch(User_ID, User_Name, User_TotalAmount, ADDR) {
  // update this value in order to do something to aimmed contract
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  value[0].cancelMakeMatch(User_ID, User_Name, User_TotalAmount, {from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
}


function addUser(User_ID, User_Name, User_TotalAmount, User_Interest, User_CreditRating, ADDR) {
  // update this value in order to do something to aimmed contract
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  value[0].addUserInContract(User_ID, User_Name, User_TotalAmount, User_Interest, User_CreditRating.charCodeAt(0), {from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
}

function make_a_match(ADDR) {
  var value = getContractInfo(ADDR);

  value[0].checkGoalReached({from: address0, gas: value[1]});
  var result = value[0].make_a_match({from: address0, gas: value[1]});
  value[0].afterMakeAMatch(result, {from: address0, gas: value[1]});
  console.log('make a match complete');
  // return parseString(show_TRANSACTION());
  // [資料]
  // [[第n筆資料]]
  // [[[貸款人, 借款人]]]
}

function getResult(ADDR){
  // console.log(parseString(show_TRANSACTION(ADDR)));
  return parseString(show_TRANSACTION(ADDR));
}


/*********************************************************/
/****************** Getters and Setters ******************/
/*********************************************************/
function showAllInfo(ADDR) {
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].showAllInfo({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  console.log(val);
  return val;
}

function upDateContract(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  console.log('update complete');
}

function show_State(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].getStatus({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_TERMS_OF_SERVICE(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].TERMS_OF_SERVICE({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
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

function show_DURATION(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].DURATION({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_NUMINVESTORS(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].NUMINVESTORS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_NUMBORROWERS(){
  var value = getContractInfo(addr);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].NUMBORROWERS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_INVESTORS(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].get_INVESTORS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}

function show_BORROWERS(ADDR){
  var value = getContractInfo(ADDR);
  value[0].checkGoalReached({from: address0, gas: value[1]});
  var val = value[0].get_BORROWERS({from: address0, gas: value[1]});
  value[0].checkGoalReached({from: address0, gas: value[1]});
  return val;
}





/*********************************************************/
/********************      Utils      ********************/
/*********************************************************/
function getContractInfo(Contract_Address) {
  let source = fs.readFileSync("./geth/contracts/MatchMaker.sol", 'utf8');
  if (demo == 1) console.log('compiling contract...');
  let compiledContract = solc.compile(source);
  if (demo == 1) console.log('done');

  for (let contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
  }
  let gasestimate = web3.eth.estimateGas({ data: '0x' + bytecode }) + 10000000000;

  // https://ethereum.stackexchange.com/questions/55222/uncaught-typeerror-this-eth-sendtransaction-is-not-a-function?rq=1
  // https://blog.csdn.net/hdyes/article/details/80818183
  var contract = web3.eth.contract(abi).at(Contract_Address);
  return [contract, gasestimate];
}

function parseString(result) {
  var data = [];
  var tmp = result.split("|");
  tmp = tmp.slice(1);
  for (let index in tmp) {
    var tmpData = [];
    var ttmp = tmp[index].split(",");
    for (let j in ttmp) {
      var tttmp = ttmp[j].split("&");
      tttmp[4] = String.fromCharCode(tttmp[4]);
      tmpData.push(tttmp);
    }
    data.push(tmpData);
  }
  return data;
}


module.exports.cancel_makeMatch = cancel_makeMatch;

module.exports.addUser = addUser;
module.exports.showAllInfo = showAllInfo;
module.exports.make_a_match = make_a_match;
module.exports.getResult = getResult;
module.exports.upDateContract = upDateContract;
module.exports.show_INVESTORS = show_INVESTORS;
module.exports.show_DURATION = show_DURATION;
