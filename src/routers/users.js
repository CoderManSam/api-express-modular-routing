const express = require('express')
const {users} = require('../../data')

const usersRouter = express.Router()


usersRouter.get('/', (req, res) => {

    res.json({"users": users})
})
  
  
usersRouter.post('/', (req,res) => {

    const {email} = req.body

    const existingEmail = (element) => element.email === email
    const emailAlreadyExists = users.some(existingEmail)

    if(emailAlreadyExists) {
        return res.status(409).json({error: "A user with the provided email already exists"})
    }


    if(!email) {
        return res.status(400).json({error: "Missing fields in request body"})
    }
  
    const newId = users.length + 1
  
    const user = {...req.body, "id": newId}
  
    users.push(user)
  
    res.status(201).json({"user": user})
})


usersRouter.get('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const user = users.find(user => user.id === idAsNumber);

    if(!user) {
        return res.status(404).json({error: "A user with the provided ID does not exist"})
    }

    res.json({"user": user})
})


usersRouter.delete('/:id', (req,res) => {

    const {id} = req.params

    const idAsNumber = Number(id)

    const userIndex =  users.findIndex(function (user) {
        return user.id === idAsNumber;
    });

    const user = users[userIndex]

    if(!user) {
        return res.status(404).json({error: "A user with the provided ID does not exist"})
    }

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

    if(!oldUser) {
        return res.status(404).json({error: "A user with the provided ID does not exist"})
    }

    const {email} = req.body

    const existingEmail = (element) => element.email === email
    const emailAlreadyExists = users.some(existingEmail)

    if(emailAlreadyExists) {
        return res.status(409).json({error: "A user with the provided email already exists"})
    }

    const updateduser = {...req.body,  
        id: oldUser.id
    }

    users.splice(userIndex, 1, updateduser)

    res.json({"user": updateduser})
})


module.exports = usersRouter