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

module.exports = {
    abi
}