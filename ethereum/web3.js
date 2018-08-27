import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fall back infura
  // OR we are on the server.
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/7befcf68a34349b0ad6c6d2135f8c188'
  );
  web3 = new Web3(provider);
}


export default web3;
