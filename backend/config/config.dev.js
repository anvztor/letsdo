const config = require('./config.global')
config.env = 'dev'
config.contractAddr = '0x7c80fe9548cbf49c0bbeb4e1fdc6e48b79dbc8ff' // assume you have deployed the MyTodo.sol at this address （sepolia）
config.privateKey = '0xe21a8a3f8c5b7169ea3fe3c732a3eef519d43e4a6e55095a1d1bb0ef99896623'  // the private key of your wallet(MetaMask) address
config.network = 'sepolia'
config.INFURA_API_KEY='0326c4f69a034543b424b27d34057159'

module.exports = config