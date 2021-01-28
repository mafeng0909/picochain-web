import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x038931733052695ab904c4af4aed3ed41041af65' // picochain网络
// const address = '0x4b201a15566b0de92074479c20b3786418327f23' // geth-nodes/ring-node

//use the ABI from your contract
const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bool","name":"ok","type":"bool"}],"name":"Verify","type":"event"},{"inputs":[{"internalType":"bytes","name":"_sig","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
export default new web3.eth.Contract(abi, address);
