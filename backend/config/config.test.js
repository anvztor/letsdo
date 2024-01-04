const config = require('./config.global')
config.env = 'test'
config.contractAddr = '0x5fbdb2315678afecb367f032d93f642f64180aa3' // assume you have deployed the MyTodo.sol at this address （local hardhat）
config.privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'  // the private key for the account you will be using to interact the MyTodo.sol

module.exports = config