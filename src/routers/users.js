const express = require('express')
const {users} = require('../../data')

const usersRouter = express.Router()


usersRouter.get('/', (req, res) => {

    res.json({"users": users})
})
  
  
usersRouter.post('/', (req,res) => {
  
    const newId = users.length + 1
  
    const user = {...req.body, "id": newId}
  
    users.push(user)
  
    res.status(201).json({"user": user})
})


usersRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const user = users.find(user => user.id === idAsNumber);

    res.json({"user": user})
})


usersRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const userIndex =  users.findIndex(function (user) {
        return user.id === idAsNumber;
    });

    const user = users[userIndex]

    users.splice(userIndex, 1)

    res.json({"user": user})
})


usersRouter.put('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const userIndex =  users.findIndex(function (user) {
        return user.id === idAsNumber;
    });

    const oldUser = users.find(user => user.id === idAsNumber);

    const updateduser = {...req.body,  
        id: oldUser.id
    }

    users.splice(userIndex, 1, updateduser)

    res.json({"user": updateduser})
})


module.exports = usersRouter