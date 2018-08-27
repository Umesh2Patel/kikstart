const HDWalletProvider = require('truffle-hdWallet-provider');
const Web3 = require('web3');
// const ganache = require('ganache-cli');
// const provider = ganache.provider();
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'hello drill pen sibling awkward junk cry worth region toilet blue behind',
  'https://rinkeby.infura.io/v3/7befcf68a34349b0ad6c6d2135f8c188'
  // 'tuna cup pill utility drama need wrestle robust talent click pass special',
  // // add - 0x05bA6d19b50aB637C87a3093ecC6d25878d5f6eF
  // 'https://rinkeby.infura.io/v3/622c3731e19a4abc84ea4dc3c6c05b5f'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', account[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to', result.options.address);
};

deploy();

// rinkeby Testnet deployment

// Attempting to deploy from account, account[0]
// Contract deployed to 0x8861CCB42Bd77fdC8cE55952c5A18b9abd11f554
