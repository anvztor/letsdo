const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('MyTodo', function () {
    async function deployMyTodoFixture() {
        const MyTodo = await ethers.getContractFactory("MyTodo");
        const mytodo = await MyTodo.deploy();
        return mytodo;
    }
    
    describe("addTodo", function () {
        it("Should create a new todo succesfully", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
        })  
    })

    describe("reset", function () {
        it("Should reset everything correctly", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.reset()).not.to.be.reverted;
            const todos = await mytodo.getTodos(1)
            const exist = await mytodo.checkTodoExist(1, 0)
            expect(todos).to.be.an("array").to.have.lengthOf(0);
            expect(exist).to.equal(false)
        })
    })

    describe("isUserRegistered", function () {
        it("Should return true if the user is used to add a todo item ever", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            const exist = await mytodo.isUserRegistered(1);
            expect(exist).to.equal(true)
        })
        it("Should return false if the user is not used to add a todo item", async function() {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            const exist = await mytodo.isUserRegistered(2);
            expect(exist).to.equal(false)
        })
    })

    describe("getLatestTodo", function () {
        it("Should return the newly added todo item under the user", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.addTodo(1, "todo11", "body11")).not.to.be.reverted;
            const latest = await mytodo.getLatestTodo(1)
            expect(latest[0]).to.equal(1)
            expect(latest[1]).to.equal('todo11')
            expect(latest[2]).to.equal('body11')
        })
        it("Should return an empty todo item if no todo belongs to the user", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            const latest = await mytodo.getLatestTodo(1)
            expect(latest[0]).to.equal(0)
            expect(latest[1]).to.equal('')
            expect(latest[2]).to.equal('')
        })
    })

    describe("getCount", function () {
        it("Check count after adding 2 new todos", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.addTodo(1, "todo12", "body12")).not.to.be.reverted;
            const count = await mytodo.getCount(1);
            expect(count).to.equal(2);
        })
    })
    
    describe("getTodos", function () {
        it("check result of getTodos when no todo is added", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            const res = await mytodo.getTodos(1);
            expect(res).to.be.an("array").to.have.lengthOf(0);
        })
        it("check result after adding a new todo, which should be successfully", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            const res = await mytodo.getTodos(1);
            expect(res).to.be.an("array").to.have.lengthOf(1);
            expect(res[0][0]).to.equal(0);
            expect(res[0][1]).to.equal("todo1");
            expect(res[0][2]).to.equal("body1");
            expect(res[0][3]).to.equal(false);
        })  
    })
    
    describe("updateTodo", function () {
        it("Should update successfully when id is valid", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.updateTodo(1, 0, "new todo", "new body")).not.to.be.reverted;
            const res = await mytodo.getTodos(1);
            expect(res).to.be.an("array").to.have.lengthOf(1);
            expect(res[0][0]).to.equal(0);
            expect(res[0][1]).to.equal("new todo");
            expect(res[0][2]).to.equal("new body");
            expect(res[0][3]).to.equal(false);
        })
        it("Should throw an error when update a to do using an invaid id", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.updateTodo(1, 1, "new todo", "new body")).to.be.revertedWith("todo id is out of index")
        })
        
        it("Should throw an error when update a todo which does not belong this user", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.addTodo(1, "todo12", "body12")).not.to.be.reverted;
            await expect(mytodo.updateTodo(2, 1, "new todo", "new body")).to.be.revertedWith("user does not contain this id")
        })
        
        it("Should throw an error when the todo we want to update is aleady deleted", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            await expect(mytodo.updateTodo(1, 0,"new todo", "new body")).to.be.revertedWith("The todo is already removed")

        })
    })

    describe("checkTodoExist", function () {
        it("Should return true to call checkTodoExist when there is a todo which belongs to a user", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            const res = await mytodo.checkTodoExist(1, 0)
            expect(res).to.equal(true)
        })
        it("Should return false to call checkTodoExist when there is a todo which does not belong to a user", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            const res = await mytodo.checkTodoExist(1, 1)
            expect(res).to.equal(false)
        })
    })

    describe("deleteTodo", function () {
        it("Should be deleted successfully when id is valid", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            const res = await mytodo.getTodos(1);
            expect(res).to.be.an("array").to.have.lengthOf(0);
        })
        it("Should throw an error when the to do want to delete is already deleted", async function () {
            const mytodo = await loadFixture(deployMyTodoFixture)
            await expect(mytodo.addTodo(1, "todo1", "body1")).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).not.to.be.reverted;
            await expect(mytodo.deleteTodo(0)).to.be.revertedWith("The todo is already removed")
        })
    })
})