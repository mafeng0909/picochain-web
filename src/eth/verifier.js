import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x822b06c58caeef7e8b329c6ebfc4d295ab2bc12d';
//use the ABI from your contract
const abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isVerified","type":"bool"}],"name":"IsVerified","type":"event"},{"inputs":[{"internalType":"uint256[2]","name":"a","type":"uint256[2]"},{"internalType":"uint256[2][2]","name":"b","type":"uint256[2][2]"},{"internalType":"uint256[2]","name":"c","type":"uint256[2]"},{"internalType":"uint256[1]","name":"input","type":"uint256[1]"}],"name":"verifyProof","outputs":[],"stateMutability":"payable","type":"function"}]
export default new web3.eth.Contract(abi, address);