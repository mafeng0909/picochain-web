import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
// const address = '0x822b06c58caeef7e8b329c6ebfc4d295ab2bc12d'; // roptsen网络
// const address = '0x68332b19ca85ce7ad8bde8046c6b7caa856bf344' // 以太坊私链网络
//const address = '0x87f9bc7ec3ed4e17f612dea69a9f8c6771e0a49a' // picochain网络
const address = '0xa590f784da845a3c2d2ee57490d94869682e1a4c' // picochain网络


//use the ABI from your contract
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isVerified","type":"bool"}],"name":"IsVerified","type":"event"},{"inputs":[{"internalType":"uint256[2]","name":"a","type":"uint256[2]"},{"internalType":"uint256[2][2]","name":"b","type":"uint256[2][2]"},{"internalType":"uint256[2]","name":"c","type":"uint256[2]"},{"internalType":"uint256[1]","name":"input","type":"uint256[1]"}],"name":"verifyProof","outputs":[],"stateMutability":"payable","type":"function"}]
// const abi = [ { "constant": false, "inputs": [ { "name": "a", "type": "uint256[2]" }, { "name": "b", "type": "uint256[2][2]" }, { "name": "c", "type": "uint256[2]" }, { "name": "input", "type": "uint256[1]" } ], "name": "verifyProof", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "isVerified", "type": "bool" } ], "name": "IsVerified", "type": "event" } ] //低版本solc
export default new web3.eth.Contract(abi, address);
