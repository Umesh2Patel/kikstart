const path = require('path');
const fs = require('fs-extra'); //File System
const solc = require('solc'); // Solidity compile

const buildPath = path.resolve(__dirname, 'build'); //path.resolve will construct the path for different OS
fs.removeSync(buildPath); //removeSync deletes everything in the /build dir

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // ensureDirSync checks if dir exist if not then create the /build dir

for(let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
