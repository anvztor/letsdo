/**
 * This is the experimental codes on how to interact with MyTodo.sol deployed on hardhat
 */

const { ethers } = require("ethers");

// Pls make sure hardhat is started on local listening at 8545
const  provider = new ethers.JsonRpcProvider();  // connect to http://localhost:8545 by default
// Make sure account1 exists in Hardhat when it is started. If not, update them accordingly
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // the first account given by local hardhat
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'  // the private key for account1
const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3' // assume you have deployed the MyTodo.sol at this address （local hardhat）

const signer = new ethers.Wallet(privateKey, provider)
const Todo = "(uint id, string title, string body, bool removed)"
const abi = [
    `function todos(uint) public view returns (${Todo})`,
    "function reset() public",
    "function addTodo(uint _userId, string _title, string _body) public",
    "function isUserRegistered(uint _userId) public view returns(bool)",
    `function getLatestTodo(uint _userId) public view returns (${Todo})`,
    `function getTodos(uint _userId) public view returns(${Todo}[])`,
    "function getCount(uint _userId) public view returns(uint)",
    "function updateTodo(uint _userId, uint _id, string _title, string _body) public",
    "function checkTodoExist(uint _userId, uint _id) public view returns(bool)",
    "function deleteTodo(uint id) public"
]

const myTodoReadOnly = new ethers.Contract(contractAddr, abi, provider)
const myTodo = myTodoReadOnly.connect(signer)

const addTodo = async () => {
    const tx1 = await myTodo.addTodo(1, 'title1', 'todo1 content1')
    await tx1.wait()
    console.log(tx1)
    const tx2 = await myTodo.addTodo(1, 'title11', 'todo1 content12')
    console.log(tx2)
}

const getLatestTodo = async () => {
    const res = await myTodoReadOnly.getLatestTodo(1)
    console.log("getLatestTodo")
    console.log(res)
}

const getTodosById = async () => {
    const res = await myTodoReadOnly.todos(0)
    console.log(res)
}

const getTodos = async (user) => {
    try {
        const res = await myTodoReadOnly.getTodos(user)
        console.log(res)
        console.log('res.length:',res.length)
        if (res.length > 0) {       
            let myMap = new Map()
            res.forEach((x) => {
                console.log(x)
                myMap.set(Number(x[0]), {id: Number(x[0]), title: x[1], body: x[2]})
            });
            console.log(Object.fromEntries(myMap))
        }
        
    }catch(error) {
        console.error(error)
    }
}

const updateTodo = async () => {
    try{
        const tx = await myTodo.updateTodo(0, 0, "title1 new", "todo1 content1 new")
        await tx.wait()
        console.log(tx)
    }catch(error) {
        console.error(error)
    }
   
}

const checkTodoExist  = async () => {
    const res = await myTodoReadOnly.checkTodoExist(1, 0)
    console.log(res)
}

const deleteTodo = async () => {
    const tx = await myTodo.deleteTodo(0);
    await tx.wait();
    console.log(tx)
}

//addTodo()
getTodos(3)
//getLatestTodo()
//getTodosById()
//updateTodo()
//checkTodoExist()
//deleteTodo()
