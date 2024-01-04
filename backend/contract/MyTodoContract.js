/**
 * This is the experimental codes on how to interact with MyTodo.sol deployed on hardhat
 */
require('dotenv').config()
const config = require('../config')
const logger = require('../helpers/logger')
const { ethers } = require("ethers");
const {abi} = require('../helpers/common/constants')

logger.info(`Environment type in contract: ${config.env}`)

let provider = undefined
if (config.env === 'test') {
    provider = new ethers.JsonRpcProvider();  // connect to http://localhost:8545 by default
} else if (config.env === 'dev') {
    const network = config.network
    const INFURA_API_KEY = config.INFURA_API_KEY
    logger.info(`network = ${network}, INFURA_API_KEY = ${INFURA_API_KEY}`)
    provider = new ethers.InfuraProvider(
        network,
        INFURA_API_KEY
      );
} else{
    logger.error(`${config.env} enviroment is not supported. Please choose test or dev mode`)
    process.exit(1)
}

const privateKey = config.privateKey
const contractAddr = config.contractAddr
const signer = new ethers.Wallet(privateKey, provider)

const myTodoReadOnly = new ethers.Contract(contractAddr, abi, provider)
const myTodo = myTodoReadOnly.connect(signer)

module.exports = {myTodoReadOnly, myTodo}