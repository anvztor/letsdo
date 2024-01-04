/**
 * This is the experimental codes on how to interact with MyTodo.sol deployed on hardhat
 */

const { ethers } = require("ethers");

const contractAddr = '0xf7d8966bf1933584eaa82af8001c1726b85a6a0c'  // assume you have deployed the MyTodo.sol at this address on sepolia
const network = "sepolia"
const INFURA_API_KEY = '0326c4f69a034543b424b27d34057159'
const privateKey = '0xe21a8a3f8c5b7169ea3fe3c732a3eef519d43e4a6e55095a1d1bb0ef99896623'
const provider = new ethers.InfuraProvider(
    network,
    INFURA_API_KEY
  );
const signer = new ethers.Wallet(privateKey, provider);

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
                myMap.set(Number(x[0]), {id: Number(x[0]), title: x[1], body: x[2]})
            });
        }
        
    }catch(error) {
        console.error(error)
    }
}

const updateTodo = async () => {
    try{
        const tx = await myTodo.updateTodo(1, 0, "title1 new", "todo1 content1 new")
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
getTodos(1)
//getLatestTodo()
//getTodosById()
//updateTodo()
//checkTodoExist()
//deleteTodo()
