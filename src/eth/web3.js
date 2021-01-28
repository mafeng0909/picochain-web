// //overrides metamask v0.2 for our 1.0 version.
//1.0 lets us use async and await instead of promises

import Web3 from 'web3';
//overrides metamask v0.2 for our v 1.0
// const web3 = new Web3(window.web3.currentProvider);
// console.log(web3.currentProvider);

/* 新版的方式 */
let web3Provider;
if (window.ethereum) {
  web3Provider = window.ethereum;
  try {
    // 请求用户授权
    window.ethereum.enable();
  } catch (error) {
    // 用户不授权时
    console.error("User denied account access")
  }
} else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
  web3Provider = window.web3.currentProvider;
} else {
  // web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3Provider = new Web3.providers.WebsocketProvider('ws://localhost:8545');
}
let web3;
web3 = new Web3(web3Provider);//web3js就是你需要的web3实例

export default web3;

