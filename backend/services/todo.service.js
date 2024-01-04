const logger = require("../helpers/logger");
const {TodoError} = require("../routes/todo/TodoErrors");
const {myTodo, myTodoReadOnly} = require("../contract/MyTodoContract")

class TodoService {
    async getAllTodos(user){
        const res = await myTodoReadOnly.getTodos(user)
        if (res.length > 0) {
            let myMap = new Map()
            res.forEach((x) => {
                myMap.set(Number(x[0]), {id: Number(x[0]), title: x[1], body: x[2]})
            });
            return Object.fromEntries(myMap)
        }
        return {}
    }

    async creatTodo(user, todo) {
        logger.info('TodoService.creatTodo...')
        const tx = await myTodo.addTodo(user, todo.title, todo.body)
        await tx.wait()
        console.log(tx)
        const latest = await myTodo.getLatestTodo(user)
        return {id: Number(latest[0]), title:latest[1], body:latest[2]}
    }

    async updateTodo(user, todo) {
        logger.info('TodoService.updateTodo...')
        const exist = await myTodoReadOnly.checkTodoExist(user, todo.id)
        logger.info(`for user ${user} and todo id ${todo.id}, it exists= ${exist}`)
        if (exist) {
            logger.info(`user =${user} todo.id=${todo.id} todo.title=${todo.title} todo.body=${todo.body}`)
            const tx = await myTodo.updateTodo(user, todo.id, todo.title, todo.body)
            await tx.wait()
            console.log(tx)
            const updatedTodo = await myTodoReadOnly.todos(todo.id)
            return {id: Number(updatedTodo[0]), title: updatedTodo[1], body: updatedTodo[2]}
        } else {
            throw new TodoError({key: 'todo_not_found', params:[todo.id, user]})
        }
    }

    async deleteTodoById(user, id) {  // only need id
        logger.info('TodoService.deleteTodoById...')
        const exist = await myTodoReadOnly.checkTodoExist(user, id)
        if (exist) {
            const tx = await myTodo.deleteTodo(id)
            await tx.wait()
            console.log(tx)
        } else {
            throw new TodoError({key: 'todo_not_found', params:[id, user]})
        }
    }
}

const todoService = new TodoService()
module.exports = todoService